import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Col, Row } from 'react-flexybox';
import { Name, Timestamp, GenericMenuActions, NoData } from 'components/TableCells';
import { LinearProgress } from 'components/ProgressIndicators';
import { DeleteIconButton } from 'components/Buttons';
import { UserIcon } from 'components/Icons';
import { Card } from 'components/Cards';
import { Checkbox, FontIcon } from 'react-md';
import { withUsers } from 'Modules/MetaResource';
import actions from '../actions';

const handleIndeterminate = isIndeterminate => (isIndeterminate ? <FontIcon>indeterminate_check_box</FontIcon> : <FontIcon>check_box_outline_blank</FontIcon>);

class UserListing extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    usersActions: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    usersPending: PropTypes.bool.isRequired,
    confirmDelete: PropTypes.func.isRequired,
  };

  state = { selectedRows: [], clearSelected: false };

  componentDidMount() {
    const { match, usersActions } = this.props;

    usersActions.fetchUsers({ fqon: match.params.fqon });
  }

  deleteOne = (row) => {
    const { match, usersActions } = this.props;

    const onSuccess = () => {
      this.setState({ clearSelected: !this.state.clearSelected });
      usersActions.fetchUsers({ fqon: match.params.fqon });
    };

    this.props.confirmDelete(() => {
      usersActions.deleteUser({ fqon: match.params.fqon, id: row.id, onSuccess, params: { force: true } });
    }, `Are you sure you want to delete ${row.name}?`);
  }


  deleteMultiple = () => {
    const { match, usersActions } = this.props;
    const { selectedRows } = this.state;

    const IDs = selectedRows.map(item => (item.id));
    const names = selectedRows.map(item => (item.name));

    const onSuccess = () => {
      this.setState({ clearSelected: !this.state.clearSelected });
      usersActions.fetchUsers({ fqon: match.params.fqon });
    };

    this.props.confirmDelete(() => {
      usersActions.deleteUsers({ ids: IDs, fqon: match.params.fqon, onSuccess, params: { force: true } });
    }, 'Confirm Delete Users', names);
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
        allowOverflow: true,
        ignoreRowClick: true,
        cell: row => (
          <GenericMenuActions
            row={row}
            fqon={this.props.match.params.fqon}
            onDelete={this.deleteOne}
            editURL={`${this.props.match.url}/${row.id}`}
            entityKey="users"
            disableEntitlements
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
        name: 'First Name',
        selector: 'properties.firstName',
        sortable: true,
      },
      {
        name: 'Last Name',
        selector: 'properties.lastName',
        sortable: true,
      },
      {
        name: 'Email',
        selector: 'properties.email',
        sortable: true,
      },
      {
        name: 'Home Org',
        selector: 'properties.gestalt_home',
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
        cell: row => <Timestamp timestamp={row.created.timestamp} />
      },
      {
        name: 'Modified',
        selector: 'modified.timestamp',
        sortable: true,
        cell: row => <Timestamp timestamp={row.modified.timestamp} />
      },
    ];
  }

  render() {
    return (
      <Row gutter={5}>
        <Col component={Card} flex={12}>
          <DataTable
            title="Users"
            data={this.props.users}
            highlightOnHover
            pointerOnHover
            selectableRows
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={{ uncheckedIcon: handleIndeterminate }}
            sortIcon={<FontIcon>arrow_downward</FontIcon>}
            defaultSortField="name"
            progressPending={this.props.usersPending}
            progressComponent={<LinearProgress id="user-listing" />}
            columns={this.defineColumns()}
            contextActions={this.defineContextActions()}
            onTableUpdate={this.handleTableChange}
            clearSelectedRows={this.state.clearSelected}
            noDataComponent={<NoData message="There are no users to display" icon={<UserIcon size={150} />} />}
            onRowClicked={this.handleRowClicked}
          />
        </Col>
      </Row>
    );
  }
}

export default compose(
  withUsers(),
  connect(null, actions),
)(UserListing);
