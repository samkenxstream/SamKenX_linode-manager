import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { compose as recompose } from 'recompose';
import Button from 'src/components/Button';
import { withStyles, WithStyles } from '@mui/styles';
import Typography from 'src/components/core/Typography';
import Grid from 'src/components/Grid';
import Radio from 'src/components/Radio';
import RenderGuard, { RenderGuardProps } from 'src/components/RenderGuard';
import TableCell from 'src/components/TableCell/TableCell';
import TableRow from 'src/components/TableRow/TableRow';
import { openStackScriptDialog as openStackScriptDialogAction } from 'src/store/stackScriptDialog';
import { ClassNames, styles } from '../StackScriptRowHelpers';

export interface Props {
  label: string;
  description: string;
  deploymentsActive: number;
  updated: string;
  disabledCheckedSelect?: boolean;
  onSelect?: (e: React.ChangeEvent<HTMLElement>, value: boolean) => void;
  checked?: boolean;
  stackScriptID: number;
  stackScriptUsername: string;
  disabled?: boolean;
}

interface DispatchProps {
  openStackScriptDialog: (stackScriptId: number) => void;
}

export type CombinedProps = Props &
  WithStyles<ClassNames> &
  DispatchProps &
  RenderGuardProps;

export class StackScriptSelectionRow extends React.Component<
  CombinedProps,
  {}
> {
  render() {
    const {
      classes,
      onSelect,
      disabledCheckedSelect,
      checked,
      label,
      description,
      stackScriptID,
      stackScriptUsername,
      openStackScriptDialog,
      disabled,
    } = this.props;

    const renderLabel = () => {
      const openDialog = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        openStackScriptDialog(stackScriptID);
      };
      return (
        <Grid container alignItems="center" className={classes.selectionGrid}>
          <Grid item className={classes.selectionGridDetails}>
            <Typography variant="h3">
              {stackScriptUsername && (
                <label
                  htmlFor={`${stackScriptID}`}
                  className={`${classes.libRadioLabel} ${classes.stackScriptUsername}`}
                >
                  {stackScriptUsername} /&nbsp;
                </label>
              )}
              <label
                htmlFor={`${stackScriptID}`}
                className={classes.libRadioLabel}
              >
                {label}
              </label>
            </Typography>
            {description && (
              <Typography variant="body1" className={classes.libDescription}>
                {description}
              </Typography>
            )}
          </Grid>
          <Grid item className={classes.selectionGridButton}>
            <Button
              buttonType="secondary"
              className={classes.detailsButton}
              compactX
              onClick={openDialog}
            >
              Show Details
            </Button>
          </Grid>
        </Grid>
      );
    };

    return (
      <TableRow data-qa-table-row={label} ariaLabel={label}>
        <TableCell>
          <Radio
            checked={!disabled && checked}
            disabled={disabledCheckedSelect || disabled}
            onChange={onSelect}
            id={`${stackScriptID}`}
          />
        </TableCell>
        <TableCell
          className={classes.stackScriptCell}
          data-qa-stackscript-title
        >
          {renderLabel()}
        </TableCell>
      </TableRow>
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (
  dispatch
) => {
  return {
    openStackScriptDialog: (stackScriptId: number) =>
      dispatch(openStackScriptDialogAction(stackScriptId)),
  };
};

export default recompose<CombinedProps, Props & RenderGuardProps>(
  connect(undefined, mapDispatchToProps),
  RenderGuard,
  withStyles(styles)
)(StackScriptSelectionRow);
