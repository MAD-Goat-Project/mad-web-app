import { Alert, Box, CircularProgress, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Assessments, {
  IAssessment,
  IAssessmentType,
} from '../../api/assessments.api';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tab-${index}`,
  };
}
function AssessmentPage() {
  const { lessonId = '' } = useParams<{ lessonId: string }>();

  const {
    data: assessments,
    isLoading,
    error,
    refetch,
  } = useQuery<IAssessment[]>('assessments', async () => {
    const id: number = parseInt(lessonId) || 0;
    return Assessments.get(id);
  });

  useEffect(() => {
    refetch(); // TODO: Refetch the data when the currentPage changes
  }, [lessonId]);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Alert severity="error">
          Unable to load assessments, please try again later!{' '}
        </Alert>
      </div>
    );
  }

  function transformAssessmentType(type: IAssessmentType) {
    switch (type) {
      case IAssessmentType.INTRODUCTION:
        return 'Introduction';
      case IAssessmentType.CONCLUSION:
        return 'Conclusion';
      default:
        return 'Assessment';
    }
  }

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {assessments?.map((assessment, index) => (
            <Tab
              label={transformAssessmentType(assessment.type)}
              {...a11yProps(index)}
              key={assessment.id}
            />
          ))}
        </Tabs>
      </Box>
      {assessments?.map((assessment, index) => (
        <TabPanel value={value} index={index} key={assessment.id}>
          {assessment.description}
        </TabPanel>
      ))}
    </Box>
  );
}

export default function Assessment() {
  return <AssessmentPage />;
}
