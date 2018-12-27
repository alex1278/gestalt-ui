import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Col, Row } from 'react-flexybox';
import { Checkbox, FontIcon } from 'react-md';
import { Name, Timestamp, GenericMenuActions, NoData } from 'components/TableCells';
import { LinearProgress } from 'components/ProgressIndicators';
import { DeleteIconButton } from 'components/Buttons';
import { VolumeIcon } from 'components/Icons';
import { Card } from 'components/Cards';
import { ALink } from 'components/Links';
import { SelectFilter, listSelectors } from 'Modules/ListFilter';
import { generateContextEntityState } from 'util/helpers/context';
import actions from '../actions';
import withVolumes from '../hocs/withVolumes';

const handleIndeterminate = isIndeterminate => (isIndeterminate ? <FontIcon>indeterminate_check_box</FontIcon> : <FontIcon>check_box_outline_blank</FontIcon>);

class VolumeListing extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    volumes: PropTypes.array.isRequired,
    volumesActions: PropTypes.object.isRequired,
    volumesPending: PropTypes.bool.isRequired,
    confirmDelete: PropTypes.func.isRequired,
  };

  state = { selectedRows: [], clearSelected: false };

  componentDidMount() {
    this.init();
  }

  init() {
    const { match, volumesActions } = this.props;
    const entity = generateContextEntityState(match.params);

    volumesActions.fetchVolumes({ fqon: match.params.fqon, entityId: entity.id, entityKey: entity.key, params: { embed: 'container' } });
  }

  deleteOne = (row) => {
    const { match, volumesActions } = this.props;

    const onSuccess = () => {
      this.setState(prevState => ({ clearSelected: !prevState.clearSelected }));
      this.init();
    };

    this.props.confirmDelete(({ force }) => {
      volumesActions.deleteVolume({ fqon: match.params.fqon, resource: row, onSuccess, params: { force } });
    }, `Are you sure you want to delete ${row.name}?`);
  }


  deleteMultiple = () => {
    const { match, volumesActions } = this.props;
    const { selectedRows } = this.state;
    const names = selectedRows.map(item => item.name);

    const onSuccess = () => {
      this.setState(prevState => ({ clearSelected: !prevState.clearSelected }));
      this.init();
    };

    this.props.confirmDelete(({ force }) => {
      volumesActions.deleteVolumes({ resources: selectedRows, fqon: match.params.fqon, onSuccess, params: { force } });
    }, 'Confirm Delete volumes', names);
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
    const { match } = this.props;

    return [
      {
        width: '56px',
        allowOverflow: true,
        ignoreRowClick: true,
        cell: row => (
          <GenericMenuActions
            row={row}
            fqon={match.params.fqon}
            onDelete={this.deleteOne}
            editURL={`${match.url}/${row.id}`}
            entityKey="volumes"
            {...this.props}
          />
        ),
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        compact: true,
        grow: 2,
        cell: row => <Name name={row.name} description={row.description} />
      },
      {
        name: 'Container',
        selector: 'properties.container.name',
        sortable: true,
        ignoreRowClick: true,
        cell: ({ properties }) => properties && properties.container && (
          <ALink
            to={`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/containers/${properties.container.id}`}
            primary
          >
            {properties.container.name}
          </ALink>
        ),
      },
      {
        name: 'Type',
        selector: 'properties.type',
        sortable: true,
      },
      {
        name: 'Access Mode',
        selector: 'properties.access_mode',
        sortable: true,
      },
      {
        name: 'Size (MiB)',
        selector: 'properties.size',
        sortable: true,
        right: true,
      },
      {
        name: 'Provider',
        selector: 'properties.provider.name',
        sortable: true,
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
            title="Volumes"
            data={this.props.volumes}
            highlightOnHover
            pointerOnHover
            selectableRows
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={{ uncheckedIcon: handleIndeterminate }}
            sortIcon={<FontIcon>arrow_downward</FontIcon>}
            defaultSortField="name"
            progressPending={this.props.volumesPending}
            progressComponent={<LinearProgress id="volume-listing" />}
            columns={this.defineColumns()}
            contextActions={this.defineContextActions()}
            onTableUpdate={this.handleTableChange}
            clearSelectedRows={this.state.clearSelected}
            noDataComponent={<NoData message="There are no volumes to display" icon={<VolumeIcon size={150} />} />}
            onRowClicked={this.handleRowClicked}
            actions={<SelectFilter disabled={this.props.volumesPending} />}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  volumes: listSelectors.filterItems()(state, 'volumes.volumes.volumes'),
});

export default compose(
  withVolumes(),
  connect(mapStateToProps, actions),
)(VolumeListing);
