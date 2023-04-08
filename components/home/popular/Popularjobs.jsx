import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useData } from '../../../app/dataContext/DataContext'
import { COLORS, SIZES } from '../../../constants'
import { searchQuery } from '../../../hook/useFetch'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'

import styles from './popularjobs.style'
import { SEARCH } from '../../../hook/endPoints'

const Popularjobs = () => {
  const router = useRouter();
  const {
    popularJobs,
    setPopularJobs,
  } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  // const error = false;
  // const isLoading = false;
  const searchTheJob = async () => {
    const response = await searchQuery(SEARCH, "React job", setIsLoading, setError);

    if (response?.status == 200) {
      setIsLoading(false);
      setPopularJobs(response?.data?.data);
    } else {
      setIsLoading(false);
      setError(true);
    }
    setIsLoading(false);
    setPopularJobs(response?.data?.data);
  }
  useEffect(() => {
    searchTheJob();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
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
            <FlatList
              data={popularJobs}
              renderItem={({ item }) => (
                <PopularJobCard item={item} />
              )}
              keyExtractor={item => item?.job_id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          )
        }
      </View>
    </View>
  )
}

export default Popularjobs;