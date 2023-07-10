import { StyleSheet, Text,StatusBar, SafeAreaView, Button } from 'react-native';
import React,{useState,useCallback} from 'react';
//import DocumentPicker, { types } from 'react-native-document-picker';

function UploadBook() {



   /* const [fileResponse, setFileResponse] = useState([]);

    const handleDocumentSelection = useCallback(async () => {
      try {
        const response = await DocumentPicker.pick({
          presentationStyle: 'fullScreen',
        });
        setFileResponse(response);
      } catch (err) {
        console.warn(err);
      }
    }, []);




*/





    return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={'dark-content'} />
          <Button title="Select 📑"    />
        </SafeAreaView>
      );
};

export default UploadBook;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });