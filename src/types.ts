import PATHS from "./paths";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  dashboard: undefined;
  supportRoot: undefined;
};

export type ModalProps = {
  setModal:(value:boolean)=>void
  modal:boolean
}

export type SheetProps = {
  setOpen:(value:boolean)=>void
  open:boolean
}

export type DashboardStackList = {
  dashboard:undefined
}

export type ColorModes = 'light'|'dark'

export type Weight = 'Regular'|'Bold'|'SemiBold'|'Light'|'Medium'|'ExtraLight'|'Italic'|'ExtraBold';

export type Route = keyof typeof PATHS
export type Visibility = 'wallet'|'savings'|'investment'|'total'
