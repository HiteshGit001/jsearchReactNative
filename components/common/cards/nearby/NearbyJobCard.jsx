import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './nearbyjobcard.style'
import { checkImageUrl } from '../../../../helper/imageFinder'

const NearbyJobCard = ({ job, handleNavigate }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.container}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          style={styles?.logImage}
          source={{
            uri: checkImageUrl(job?.employer_logo)
              ? job?.employer_logo
              : 'https://images-platform.99static.com//RzEfP2c6NsHRKWRwXSywtrTSfH0=/134x0:1886x1752/fit-in/500x500/99designs-contests-attachments/123/123274/attachment_123274898'
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>{job?.job_title}</Text>
        <Text style={styles.jobType}>{job?.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard