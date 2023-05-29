

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const HomePage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'Product 1',
      description: 'Description 1',
      image: require('Ag.png'),
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description 2',
      image: require('Ag.png'),
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'Description 3',
      image: require('Ag.png'),
    },
    {
      id: 4,
      title: 'Product 4',
      description: 'Description 4',
      image: require('Ag.png'),
    },
    {
      id: 5,
      title: 'Product 5',
      description: 'Description 5',
      image: require('Ag.png'),
    },
    {
      id: 6,
      title: 'Product 6',
      description: 'Description 6',
      image: require('Ag.png'),
    },
    // Add more products as needed
  ]);

  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.productItem}>
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
    );
  };

  const renderProductRow = ({ item }) => {
    return (
      <View style={styles.productRow}>
        {item.map((product) => (
          <View key={product.id} style={styles.productColumn}>
            {renderProductItem({ item: product })}
          </View>
        ))}
      </View>
    );
  };

  const formatProductData = (data, numColumns) => {
    const numOfRows = Math.ceil(data.length / numColumns);
    const formattedData = Array.from({ length: numOfRows }, (_, rowIndex) => {
      const start = rowIndex * numColumns;
      const end = start + numColumns;
      return data.slice(start, end);
    });
    return formattedData;
  };

  const formattedProducts = formatProductData(products, 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aggie Marketplace</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Services</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={formattedProducts}
        renderItem={renderProductRow}
        keyExtractor={(item, index) => `row-${index}`}
        contentContainerStyle={styles.productList}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 33,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 26,
    backgroundColor: 'black',
    borderRadius: 100,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  productList: {
    paddingBottom: 16,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  productColumn: {
    flex: 1,
    marginRight: 8,
  },
  productItem: {
    marginBottom: 5,
    padding: 8,
    backgroundColor: 'grey',
    borderRadius: 8,
  },
  productImage: {
    width: '100%',
    height: windowWidth / 2 - 16,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    backgroundColor: 'lightblue',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 1,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  bottomButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'black',
    borderRadius: 100,
  },
  bottomButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomePage;
