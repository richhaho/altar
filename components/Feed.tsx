// Feed.js

import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import FeedItem from './FeedItem';

const mockedData = [
  {
    id: '1',
    profilePicture:
      'https://pbs.twimg.com/profile_images/563105554822737921/F-iH3BMT_400x400.png',
    displayName: 'John Doe',
    username: 'john_doe',
    minutesAgo: 5,
    text: 'This is a sample post. Hello, world!',
  },
  {
    id: '2',
    profilePicture:
      'https://pbs.twimg.com/profile_images/563105554822737921/F-iH3BMT_400x400.png',
    displayName: 'Jane Doe',
    username: 'jane_doe',
    minutesAgo: 5,
    text: 'This is a sample prayer post. I have been thinking a lot about 2 Corinthians... What a great book',
  },
  {
    id: '3',
    profilePicture:
      'https://pbs.twimg.com/profile_images/563105554822737921/F-iH3BMT_400x400.png',
    displayName: 'John Doe',
    username: 'john_doe',
    minutesAgo: 5,
    text: 'This is a sample post. Hello, world!',
  },
  {
    id: '4',
    profilePicture:
      'https://pbs.twimg.com/profile_images/563105554822737921/F-iH3BMT_400x400.png',
    displayName: 'Jane Doe',
    username: 'jane_doe',
    minutesAgo: 5,
    text: 'This is a sample prayer post. I have been thinking a lot about 2 Corinthians... What a great book',
  },
  {
    id: '5',
    profilePicture:
      'https://pbs.twimg.com/profile_images/563105554822737921/F-iH3BMT_400x400.png',
    displayName: 'John Doe',
    username: 'john_doe',
    minutesAgo: 5,
    text: 'This is a sample post. Hello, world!',
  },
  // Add more items as needed
];

const Feed = ({openDrawer, closeDrawer, onActionPress, data}: any) => {
  const postsArray = Object.values(data || {});
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={postsArray}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <FeedItem
          data={item}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          onActionPress={onActionPress}
        />
      )}
    />
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginBottom: 64
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
});
