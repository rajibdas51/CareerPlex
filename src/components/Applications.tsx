'use client';

import { Modal } from 'antd';

const Applications = ({
  showApplications,
  setShowApplications,
  selectedJob,
}: {
  showApplications: boolean;
  setShowApplications: (showApplications: boolean) => void;
  selectedJob: any;
}) => {
  return (
    <Modal
      title='Applicaitons'
      open={showApplications}
      onCancel={() => setShowApplications(false)}
    ></Modal>
  );
};

export default Applications;
