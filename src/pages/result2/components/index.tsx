import Layout from '@/components/layout/layout';

import Fee from '../components/fee';

function MyComponent() {
  return (
    <Layout footerHidden={true}>
      <Fee />
    </Layout>
  );
}

export default MyComponent;

// // // TypeScript에서는 document.getElementById를 사용하여 마운트 노드를 지정해야 합니다.
// ReactDOM.render(<Demo />, document.getElementById('mountNode') as HTMLElement);
