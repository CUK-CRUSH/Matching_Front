import useFetchTerms from '@/components/terms/termsFetch';

export const TermsOfUseWords = () => {
  const { content, error, isLoading } = useFetchTerms('signUpContent');
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return <div className="whitespace-pre-wrap">{content}</div>;
};
export const PrivacyWords = () => {
  const { content, isLoading, error } = useFetchTerms('privacyPolicyContent');
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return <div className="whitespace-pre-wrap">{content}</div>;
};
