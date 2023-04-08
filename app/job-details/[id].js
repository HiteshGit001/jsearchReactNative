import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { COLORS, SIZES, icons } from '../../constants';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { jobDetails } from '../../hook/useFetch';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import styles from '../../styles/search'

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const tabs = ['About', 'Qualifications', 'Responsibilities'];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refershing, setRefershing] = useState(false);
  const [JD, setJD] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const fetchJobDetails = async () => {
    const response = await jobDetails("job-details", params.id, setIsLoading, setError);
    if (response?.status == 200) {
      setIsLoading(false);
      setJD(response?.data?.data);
    } else {
      setIsLoading(false);
      setError(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchJobDetails()
  }, []);

  const onRefresh = () => useCallback(() => {
    setRefershing(true);
    fetchJobDetails();
    setRefershing(false);
  }, [])

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return <Specifics
          title="Qualifications"
          points={JD[0]?.job_highlights?.Qualifications ?? ['N/A']}
        />
      case "About":
        return <JobAbout
          info={JD[0]?.job_description ?? ['N/A']}
        />
      case "Responsibilities":
        return <Specifics
          title="Responsibilities"
          points={JD[0]?.job_highlights?.Responsibilities ?? ['N/A']}
        />
        break;
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension='60%'
            />
          ),
          headerTitle: ''
        }}
      />
      <>
        <ScrollView showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refershing}
              onRefresh={onRefresh}
            />
          }
        >
          {
            isLoading
              ? <ActivityIndicator size='large' color={COLORS.primary} />
              : error ? (
                <Text>Something went wrong</Text>
              )
                : JD?.length === 0 ? (
                  <Text>NO DATA</Text>
                ) : (
                  <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                    <Company
                      jobTitle={JD[0]?.job_title}
                      companyLogo={JD[0]?.employer_logo}
                      companyName={JD[0]?.employer_name}
                      location={JD[0]?.job_country}
                    />
                    <JobTabs
                      tabs={tabs}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                    {
                      displayTabContent()
                    }
                  </View>
                )
          }
        </ScrollView>
        <JobFooter url={JD[0]?.job_google_link ?? 'https://careers'} />
      </>
    </SafeAreaView>
  )
}

export default JobDetails;