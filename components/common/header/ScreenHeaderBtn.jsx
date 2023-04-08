import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = (props) => {
  const { dimension, iconUrl, handlePress } = props;
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        style={styles.btnImg(dimension)}
        resizeMode="cover"
      />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn