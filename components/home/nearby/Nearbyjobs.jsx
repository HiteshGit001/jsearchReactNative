import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { COLORS, SIZES } from '../../../constants'
import { searchQuery } from '../../../hook/useFetch'
import styles from './nearbyjobs.style'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import { useData } from '../../../app/dataContext/DataContext'
import { SEARCH } from '../../../hook/endPoints'

const Nearbyjobs = () => {
  const router = useRouter();
  const {
    nearbyJobs,
    setNearbyJobs,
  } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchTheJob = async () => {
    const response = await searchQuery(SEARCH, "React job", setIsLoading, setError);
    if (response?.status == 200) {
      setIsLoading(false);
      setNearbyJobs(response?.data?.data);
    } else {
      setIsLoading(false);
      setError(true);
    }
    setIsLoading(false);
    setNearbyJobs(response?.data?.data);
  }
  useEffect(() => {
    searchTheJob();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {
          isLoading ? (
            <ActivityIndicator size="large" colors={COLORS.primary} />
          ) : error ? (
            <Text>Opps Something went wrong</Text>
          ) : (
            nearbyJobs?.map((item) => {
              return (
                <NearbyJobCard
                  job={item}
                  key={`nearby-job-${item?.job_id}`}
                  handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
                />
              )
            })
          )
        }
      </View>
    </View>
  )
}

export default Nearbyjobs;