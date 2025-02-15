import { Event } from '@linode/api-v4/lib/account';
import { LinodeStatus } from '@linode/api-v4/lib/linodes';
import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import LinearProgress from 'src/components/LinearProgress';
import TableCell from 'src/components/TableCell';
import TableRow from 'src/components/TableRow';
import {
  getProgressOrDefault,
  linodeInTransition,
} from 'src/features/linodes/transitions';

type ClassNames = 'bodyRow' | 'status' | 'bodyCell';

const styles = (theme: Theme) =>
  createStyles({
    bodyRow: {
      height: 'auto',
      '&:before': {
        borderBottomColor: 'transparent',
      },
    },
    bodyCell: {
      border: 0,
      paddingBottom: 0,
    },
    status: {
      textTransform: 'capitalize',
      marginBottom: theme.spacing(1),
      color: theme.palette.text.primary,
      fontSize: '.92rem',
    },
  });

interface Props {
  linodeId: number;
  linodeStatus: LinodeStatus;
  linodeRecentEvent?: Event;
}

type CombinedProps = Props & WithStyles<ClassNames>;

const LinodeRowLoading: React.FC<CombinedProps> = (props) => {
  const {
    classes,
    linodeId,
    linodeStatus,
    linodeRecentEvent,
    children,
  } = props;

  return (
    <TableRow
      key={linodeId}
      className={classes.bodyRow}
      data-qa-linode={linodeId}
      data-qa-loading
    >
      {children}
      <TableCell colSpan={5} className={classes.bodyCell}>
        {linodeInTransition(linodeStatus, linodeRecentEvent) && (
          <ProgressDisplay progress={getProgressOrDefault(linodeRecentEvent)} />
        )}
      </TableCell>
    </TableRow>
  );
};

const styled = withStyles(styles);

export default styled(LinodeRowLoading);

const ProgressDisplay: React.FC<{
  progress: null | number;
}> = (props) => {
  const { progress } = props;

  return progress ? (
    <LinearProgress value={progress} />
  ) : (
    <LinearProgress variant="indeterminate" />
  );
};
