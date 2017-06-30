import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-md/lib/Cards/Card';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import FontIcon from 'react-md/lib/FontIcons';
import { FormattedDate, FormattedTime } from 'react-intl';
import { Breadcrumbs } from 'modules/ContextManagement';
import { Button, DeleteIconButton } from 'components/Buttons';
import { DataTable, TableHeader, TableBody, TableColumn, TableRow, TableCardHeader } from 'components/Tables';

class GroupItem extends PureComponent {
  static propTypes = {
    fetchGroups: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired,
    groupsPending: PropTypes.bool.isRequired,
    deleteGroups: PropTypes.func.isRequired,
    unloadGroups: PropTypes.func.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    handleTableSelected: PropTypes.func.isRequired,
    handleTableSortIcon: PropTypes.func.isRequired,
    selectedGroups: PropTypes.object.isRequired,
    clearTableSelected: PropTypes.func.isRequired,
    clearTableSort: PropTypes.func.isRequired,
    sortTable: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchGroups, match } = this.props;
    fetchGroups(match.params.fqon);
  }

  componentWillUnmount() {
    const { unloadGroups, clearTableSelected, clearTableSort } = this.props;
    unloadGroups();
    clearTableSelected();
    clearTableSort();
  }

  handleRowToggle(row, toggled, count) {
    const { groups, handleTableSelected, selectedGroups } = this.props;

    handleTableSelected(row, toggled, count, groups, selectedGroups.selectedItems);
  }

  edit(group, e) {
    // TODO: workaround for checkbox event bubbling
    if (e.target.className.includes('md-table-column')) {
      this.props.history.push(`/${this.props.match.params.fqon}/groups/${group.id}/edit`);
    }
  }

  delete() {
    const { match, fetchGroups, deleteGroups, clearTableSelected } = this.props;
    const { selectedItems } = this.props.selectedGroups;
    const groupIds = selectedItems.map(item => (item.id));
    const groupsNames = selectedItems.map(item => (item.name));

    const onSuccess = () => {
      clearTableSelected();
      fetchGroups(match.params.fqon);
    };

    this.props.confirmDelete(() => {
      deleteGroups(groupIds, match.params.fqon, onSuccess);
    }, groupsNames);
  }

  renderCreateButton() {
    return (
      <Button
        id="create-group"
        label="Create Group"
        flat
        primary
        component={Link}
        to={`/${this.props.match.params.fqon}/groups/create`}
      >
        <FontIcon>add</FontIcon>
      </Button>
    );
  }

  render() {
    const { selectedCount } = this.props.selectedGroups;
    const { handleTableSortIcon, sortTable } = this.props;

    const groups = this.props.groups.map(group => (
      <TableRow key={group.id} onClick={e => this.edit(group, e)}>
        <TableColumn>{group.name}</TableColumn>
        <TableColumn>{group.description}</TableColumn>
        <TableColumn><FormattedDate value={group.created.timestamp} /> <FormattedTime value={group.created.timestamp} /></TableColumn>
      </TableRow>
    ));

    return (
      <div className="flex-row">
        <Card className="flex-12" tableCard>
          <TableCardHeader
            title={
              <div>
                <div className="gf-headline">Groups</div>
                <div className="md-caption"><Breadcrumbs /></div>
              </div>
            }
            visible={selectedCount > 0}
            contextualTitle={`${selectedCount} group${selectedCount > 1 ? 's' : ''} selected`}
            actions={[<DeleteIconButton onClick={() => this.delete()} />]}
          >
            <div>{this.renderCreateButton()}</div>
          </TableCardHeader>
          {this.props.groupsPending ? <LinearProgress id="groups-listing" /> : null}
          <DataTable baseId="Groups" onRowToggle={(r, t, c) => this.handleRowToggle(r, t, c)}>
            {this.props.groups.length > 0 &&
            <TableHeader>
              <TableRow>
                <TableColumn sorted={handleTableSortIcon('name', true)} onClick={() => sortTable('name')}>Name</TableColumn>
                <TableColumn sorted={handleTableSortIcon('description')} onClick={() => sortTable('description')}>Description</TableColumn>
                <TableColumn sorted={handleTableSortIcon('created.timestamp')} onClick={() => sortTable('created.timestamp')}>Created</TableColumn>
              </TableRow>
            </TableHeader>}
            <TableBody>
              {groups}
            </TableBody>
          </DataTable>
        </Card>
      </div>
    );
  }
}

export default GroupItem;
