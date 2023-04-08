import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { icons, SIZES } from '../../../constants'

import styles from './welcome.style'

const Welcome = ({ search, setSearch, handleClick }) => {
  const jobType = ["Full-Time", "Part-time", "Contracter", "Internship"];
  const route = useRouter();
  const [activeTab, setActiveTab] = useState("Full-Time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Hites</Text>
        <Text style={styles.welcomeMessage}>Find your dream job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="What are you looking for?"
          />
        </View>
        <TouchableOpacity onPress={handleClick} style={styles.searchBtn}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobType}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeTab, item)}
              onPress={() => {
                setActiveTab(item);
                route.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeTab, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome