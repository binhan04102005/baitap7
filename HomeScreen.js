import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ route, navigation }) {
  // Lấy params gửi từ LoginScreen
  const { phoneNumber } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Trang chủ</Text>
      <Text style={styles.info}>Số điện thoại của bạn: {phoneNumber}</Text>
      
      <TouchableOpacity 
        style={styles.logoutBtn} 
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: '#007AFF' , fontSize:14,textAlign:'center' }}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },
  welcome: { fontSize: 42 ,fontWeight: 'bold', marginBottom: 50 },
  info: { fontSize: 16, color: '#555', marginBottom: 40 },
  logoutBtn: {backgroundColor:'lightgray', padding: 15 , width:130,height:55 , borderWidth:2 , borderRadius:20  }
});