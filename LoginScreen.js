import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const formatPhoneNumber = (text) => {
    const cleaned = ('' + text).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) return [match[1], match[2], match[3]].filter(Boolean).join(' ');
    return cleaned;
  };

  const handleChangeText = (text) => {
    const formatted = formatPhoneNumber(text);
    if (formatted.length <= 12) {
      setPhone(formatted);
      if (error) setError('');
    }
  };

  const handleContinue = () => {
    const rawPhone = phone.replace(/\s/g, '');
    const phoneRegex = /^(0[3|5|7|8|9])([0-9]{8})$/;

    if (rawPhone === '') {
      setError("Vui lòng nhập số điện thoại");
      return;
    }

    if (phoneRegex.test(rawPhone)) {
      setError('');
      // CHUYỂN MÀN HÌNH Ở ĐÂY
      navigation.navigate('Home', { phoneNumber: phone });
    } else {
      setError("Số điện thoại không đúng định dạng.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <View style={styles.content}>
          <Text style={styles.headerText}>Đăng nhập</Text>
          <Text style={styles.title}>Nhập số điện thoại</Text>
          <Text style={styles.subtitle}>Sử dụng số điện thoại để tiếp tục</Text>
          
          <TextInput
            style={[styles.input, error ? { borderBottomColor: 'red' } : {}]}
            placeholder="0XX XXX XXXX"
            keyboardType="numeric"
            value={phone}
            onChangeText={handleChangeText}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: phone.replace(/\s/g, '').length === 10 ? '#007AFF' : '#F2F2F7' }]} 
            onPress={handleContinue}
          >
            <Text style={[styles.buttonText, { color: phone.replace(/\s/g, '').length === 10 ? '#fff' : '#A1A1A1' }]}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Giữ nguyên Styles cũ của bạn...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1, paddingHorizontal: 20 },
  headerText: { fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
  content: { flex: 1 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 30 },
  input: { height: 50, borderBottomWidth: 1, borderBottomColor: '#E8E8E8', fontSize: 20, letterSpacing: 1 },
  errorText: { color: 'red', fontSize: 13, marginTop: 8 },
  footer: { marginBottom: 30 },
  button: { height: 55, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: '600' },
});