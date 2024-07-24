import { create } from 'zustand';

interface TermsState {
  allChecked: boolean;
  signinChecked: boolean;
  privacyChecked: boolean;
  smsChecked: boolean;
  setAllChecked: (checked: boolean) => void;
  setSigninChecked: (checked: boolean) => void;
  setPrivacyChecked: (checked: boolean) => void;
  setSmsChecked: (checked: boolean) => void;
  checkAllCondition: () => void;
}

const useTermsStore = create<TermsState>((set, get) => ({
  allChecked: false,
  signinChecked: false,
  privacyChecked: false,
  smsChecked: false,
  setAllChecked: (checked: boolean) =>
    set({
      allChecked: checked,
      signinChecked: checked,
      privacyChecked: checked,
      smsChecked: checked,
    }),
  setSigninChecked: (checked: boolean) => {
    set({ signinChecked: checked });
    get().checkAllCondition();
  },
  setPrivacyChecked: (checked: boolean) => {
    set({ privacyChecked: checked });
    get().checkAllCondition();
  },
  setSmsChecked: (checked: boolean) => {
    set({ smsChecked: checked });
    get().checkAllCondition();
  },
  checkAllCondition: () => {
    const { signinChecked, privacyChecked, smsChecked } = get();
    const all = signinChecked && privacyChecked && smsChecked;
    set({ allChecked: all });
  },
}));

export default useTermsStore;
