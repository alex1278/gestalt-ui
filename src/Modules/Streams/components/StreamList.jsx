import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Col, Row } from 'react-flexybox';
import { Name, Timestamp, GenericMenuActions, NoData } from 'components/TableCells';
import { LinearProgress } from 'components/ProgressIndicators';
import { DeleteIconButton } from 'components/Buttons';
import { StreamIcon } from 'components/Icons';
import { Card } from 'components/Cards';
import { Checkbox, FontIcon } from 'react-md';
import { SelectFilter, listSelectors } from 'Modules/ListFilter';
import { generateContextEntityState } from 'util/helpers/context';
import actions from '../actions';
import withStreamSpecs from '../hocs/withStreamSpecs';

const handleIndeterminate = isIndeterminate => (isIndeterminate ? <FontIcon>indeterminate_check_box</FontIcon> : <FontIcon>check_box_outline_blank</FontIcon>);

class StreamList extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    streamSpecs: PropTypes.array.isRequired,
    streamSpecsPending: PropTypes.bool.isRequired,
    streamSpecsActions: PropTypes.object.isRequired,
  };

  state = { selectedRows: [], clearSelected: false };

  componentDidMount() {
    const { match, streamSpecsActions } = this.props;
    const entity = generateContextEntityState(match.params);

    streamSpecsActions.fetchStreamSpecs({ fqon: match.params.fqon, entityId: entity.id, entityKey: entity.key });
  }

  deleteOne = (row) => {
    const { match, streamSpecsActions } = this.props;
    const onSuccess = () => {
      this.setState(prevState => ({ clearSelected: !prevState.clearSelected }));
    };

    this.props.confirmDelete(({ force }) => {
      streamSpecsActions.deleteStreamSpec({ fqon: match.params.fqon, resource: row, onSuccess, params: { force } });
    }, `Are you sure you want to delete ${row.name}?`);
  }

  deleteMultiple = () => {
    const { match, streamSpecsActions } = this.props;
    const { selectedRows } = this.state;
    const names = selectedRows.map(item => (item.name));

    const onSuccess = () => {
      this.setState(prevState => ({ clearSelected: !prevState.clearSelected }));
    };

    this.props.confirmDelete(({ force }) => {
      streamSpecsActions.deleteStreamSpecs({ fqon: match.params.fqon, resources: selectedRows, onSuccess, params: { force } });
    }, 'Confirm Delete Streams Specifications', names);
  }

  handleTableChange = ({ selectedRows }) => {
    this.setState({ selectedRows });
  };

  handleRowClicked = (row) => {
    const { history, match } = this.props;

    history.push(`${match.url}/${row.id}`);
  }

  defineContextActions() {
    return [
      <DeleteIconButton key="delete-items" onClick={this.deleteMultiple} />,
    ];
  }

  defineColumns() {
    return [
      {
        width: '56px',
        button: true,
        allowOverflow: true,
        ignoreRowClick: true,
        cell: row => (
          <GenericMenuActions
            row={row}
            fqon={this.props.match.params.fqon}
            onDelete={this.deleteOne}
            editURL={`${this.props.match.url}/${row.id}`}
            entityKey="streamspecs"
            {...this.props}
          />
        ),
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        grow: 3,
        cell: row => <Name name={row.name} description={row.description} />
      },
      {
        name: 'Owner',
        selector: 'owner.name',
        sortable: true,
      },
      {
        name: 'Created',
        selector: 'created.timestamp',
        sortable: true,
        wrap: true,
        cell: row => <Timestamp timestamp={row.created.timestamp} />
      },
      {
        name: 'Modified',
        selector: 'modified.timestamp',
        sortable: true,
        wrap: true,
        cell: row => <Timestamp timestamp={row.modified.timestamp} />
      },
    ];
  }

  render() {
    return (
      <Row gutter={5}>
        <Col component={Card} flex={12}>
          <DataTable
            title="Streams"
            data={this.props.streamSpecs}
            highlightOnHover
            pointerOnHover
            selectableRows
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={{ uncheckedIcon: handleIndeterminate }}
            sortIcon={<FontIcon>arrow_downward</FontIcon>}
            defaultSortField="name"
            progressPending={this.props.streamSpecsPending}
            progressComponent={<LinearProgress id="stream-listing" />}
            columns={this.defineColumns()}
            contextActions={this.defineContextActions()}
            onTableUpdate={this.handleTableChange}
            clearSelectedRows={this.state.clearSelected}
            noDataComponent={<NoData message="There are no streams to display" icon={<StreamIcon size={150} />} />}
            onRowClicked={this.handleRowClicked}
            actions={<SelectFilter disabled={this.props.streamSpecsPending} />}
            pagination
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  streamSpecs: listSelectors.filterItems()(state, 'streamSpecs.streamSpecs.streamSpecs'),
});

export default compose(
  withStreamSpecs,
  connect(mapStateToProps, actions),
)(StreamList);