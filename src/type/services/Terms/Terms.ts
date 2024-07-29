type TermData = {
  id: number;
  content: string;
};

export type TermsResponseDTO = {
  status: number;
  message: string;
  data: {
    signUpTerm: TermData;
    privacyPolicyTerm: TermData;
  };
};
