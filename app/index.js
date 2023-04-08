import { View, Text, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import { SafeAreaView } from "react-native";
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from "../components";
import DataContextProvider from "./dataContext/DataContext";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const [search, setSearch] = useState();
  return (
    <DataContextProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
            ),
            headerTitle: ""
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              padding: SIZES.medium
            }}
          >
            <Welcome
              search={search}
              setSearch={setSearch}
              handleClick={() => {
                if (search) {
                  router.push(`/search/${search}`)
                }
              }}
            />
            <Popularjobs />
            <Nearbyjobs />
          </View>
        </ScrollView>
      </SafeAreaView>
    </DataContextProvider>
  )
}

export default Home;