import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';
import DataTable from 'react-data-table-component';
import { Col, Row } from 'react-flexybox';
import Div from 'components/Div';
import { Title } from 'components/Typography';
import { IconButton } from 'components/Buttons';
import { DeleteIcon } from 'components/Icons';
import { ALink } from 'components/Links';
import { ModalConsumer } from 'Modules/ModalRoot/ModalContext';
import VolumeCreateModal from './VolumeCreateModal';
import VolumeCreateMenu from './VolumeCreateMenu';
import actions from '../actions';
import { selectVolumeListing } from '../reducers/selectors';

class VolumePanel extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    volumesDropdown: PropTypes.array,
    volumes: PropTypes.array.isRequired,
    selectedProvider: PropTypes.object.isRequired,
    editMode: PropTypes.bool,
    volumeListing: PropTypes.array.isRequired,
    setVolumes: PropTypes.func.isRequired,
    removeVolume: PropTypes.func.isRequired,
    unloadVolumes: PropTypes.func.isRequired,
  };

  static defaultProps = {
    editMode: false,
    volumesDropdown: [],
  };

  // TODO: will fix when react-router fixes hoisting error
  // static contextType = ModalConsumer;

  componentDidMount() {
    const { setVolumes, volumes } = this.props;

    setVolumes(volumes);
  }

  componentWillUnmount() {
    const { unloadVolumes } = this.props;

    unloadVolumes();
  }

  formatActionState = (row) => {
    const { editMode } = this.props;
    if (get(row, 'volume_resource.properties.container.id')) {
      return 'Attached';
    }

    if (row.volume_id &&
      row.volume_resource &&
      row.volume_resource.id) {
      return editMode ? 'Attach on Update' : 'Attach';
    }

    return editMode ? 'Create on Update' : 'Create';
  }

  handleMenuSelect = (mode) => {
    const { selectedProvider, volumes, volumesDropdown } = this.props;
    const { showModal } = this.context;

    showModal(VolumeCreateModal, {
      mode,
      selectedProvider,
      volumes,
      volumesDropdown,
    });
  }

  handleDetach = row => () => {
    const { removeVolume } = this.props;

    removeVolume(row);
  }

  defineColumns() {
    const { match, editMode } = this.props;

    // only show link cell in editMode or for existing
    const cell = {
      cell: row => (editMode && get(row, 'volume_resource.id')
        ?
          <ALink
            to={`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/volumes/${row.volume_resource.id}`}
            primary
          >
            {row.volume_resource.name}
          </ALink>
        :
        get(row, 'volume_resource.name'))
    };

    return [
      {
        name: 'State',
        selector: 'action',
        format: this.formatActionState,
      },
      {
        name: 'Volume Name',
        selector: 'volume_resource.name',
        sortable: true,
        ignoreRowClick: true,
        ...cell,
      },
      {
        name: 'Type',
        selector: 'volume_resource.properties.type',
        sortable: true,
      },
      {
        name: 'Mount Path',
        selector: 'mount_path',
        sortable: true,
      },
      {
        name: 'Size (MiB)',
        selector: 'volume_resource.properties.size',
        sortable: true,
        right: true,
      },
      {
        name: 'Access Mode',
        selector: 'volume_resource.properties.access_mode',
        sortable: true,
      },
      {
        width: '56px',
        button: true,
        allowOverflow: true,
        ignoreRowClick: true,
        cell: row => (
          <IconButton
            id={row.id}
            icon={<DeleteIcon size={20} />}
            tooltipLabel="Detach this volume"
            tooltipPosition="left"
            onClick={this.handleDetach(row)}
          />
        ),
      },
    ];
  }

  render() {
    const { volumeListing, ...rest } = this.props;

    return (
      <React.Fragment>
        <Div padding="8px" paddingLeft="16px">
          <VolumeCreateMenu onSelect={this.handleMenuSelect} {...rest} />
        </Div>
        <Row>
          <Col flex={12}>
            <DataTable
              noHeader
              data={volumeListing}
              // highlightOnHover
              sortIcon={<ArrowDownIcon />}
              defaultSortField="name"
              columns={this.defineColumns()}
              noDataComponent={<Title light>There are no volumes to display</Title>}
              pagination
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  volumeListing: selectVolumeListing(state),
});

export default compose(
  connect(mapStateToProps, actions),
  withRouter,
)(VolumePanel);
// TODO: Place here to fix hoisting issue
VolumePanel.contextType = ModalConsumer;
