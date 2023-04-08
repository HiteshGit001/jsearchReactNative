import React from 'react'
import { View, Text } from 'react-native'

import styles from './company.style'
import { Image } from 'react-native'
import { checkImageUrl } from '../../../helper/imageFinder'
import { icons } from '../../../constants'

const Company = ({ companyLogo, jobTitle, companyName, location }) => {

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          style={styles?.logoImage}
          source={{
            uri: checkImageUrl(companyLogo)
              ? companyLogo
              : 'https://images-platform.99static.com//RzEfP2c6NsHRKWRwXSywtrTSfH0=/134x0:1886x1752/fit-in/500x500/99designs-contests-attachments/123/123274/attachment_123274898'
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName}</Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  )
}

export default Company