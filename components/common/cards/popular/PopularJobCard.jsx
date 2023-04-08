import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { images } from '../../../../constants'
import { checkImageUrl } from '../../../../helper/imageFinder'

import styles from './popularjobcard.style'

const PopularJobCard = ({ item }) => {
  const router = useRouter();

  const [selectedJob, setSelectedJob] = useState()
  const handlePress = (item) => {
    setSelectedJob(item?.job_id);
    router.push(`/job-details/${item?.job_id}`)
  }

  return (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.container(selectedJob, item)}>
      <Image
        style={styles?.logoContainer(selectedJob, item)}
        source={{
          uri: checkImageUrl(item?.employer_logo)
            ? item?.employer_logo
            : 'https://images-platform.99static.com//RzEfP2c6NsHRKWRwXSywtrTSfH0=/134x0:1886x1752/fit-in/500x500/99designs-contests-attachments/123/123274/attachment_123274898'
        }}
        resizeMode="contain"
      />
      <Text style={styles.companyName}>{item?.employer_name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>{item?.job_title}</Text>
        <Text style={styles.location}>{item?.job_country}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PopularJobCard