import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Zeroconf from 'react-native-zeroconf';
import axios from 'react-native-axios';

export default function App() {
  const [services, setServices] = useState([]);
  const [responses, setResponses] = useState({});

  // Log services whenever they change
  useEffect(() => {
    console.log('Updated services:', services);
  }, [services]);

  useEffect(() => {
    // Initialize Zeroconf
    const zeroconf = new Zeroconf();

    // Start scanning for services
    zeroconf.scan('http', 'tcp', 'local.');

    // Event: Scan started
    zeroconf.on('start', () => {
      console.log('Scan started');
    });

    // Event: Service found
    zeroconf.on('found', (service) => {
      console.log('Service found:', service);
    });

    // Event: Service resolved
    zeroconf.on('resolved', (service) => {
      if (!service.name) {
        console.log('Service resolved with no name:', service);
        return;
      }
      console.log('Service resolved:', service);

      // Check if the service already exists in the array
      setServices((prevServices) => {
        const exists = prevServices.some((s) => s.name === service.name);
        if (!exists) {
          return [...prevServices, service];
        }
        return prevServices;
      });
    });

    // Event: Service removed
    zeroconf.on('remove', (service) => {
      console.log('Service removed:', service.name);
      setServices((prevServices) =>
        prevServices.filter((s) => s.name !== service.name)
      );
    });

    // Event: Error
    zeroconf.on('error', (error) => {
      console.error('Error:', error);
    });

    // Cleanup on unmount
    return () => {
      zeroconf.stop();
      zeroconf.removeAllListeners();
    };
  }, []);

  // Function to send a request to a service
  const sendRequestToService = async (service) => {
    try {
      const url = `http://${service.addresses[0]}:${service.port}/`;
      console.log(`Sending request to: ${url}`);
      const response = await axios.get(url);
      setResponses((prevResponses) => ({
        ...prevResponses,
        [service.name]: response.data,
      }));
    } catch (error) {
      console.error(`Error sending request to ${service.name}:`, error);
      setResponses((prevResponses) => ({
        ...prevResponses,
        [service.name]: 'Error: Failed to fetch response',
      }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>mDNS Service Discovery</Text>
      <ScrollView style={styles.servicesContainer}>
        {services.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={styles.service}
            onPress={() => sendRequestToService(service)}
          >
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDetails}>
              IP: {service.addresses?.join(', ')}
            </Text>
            <Text style={styles.serviceDetails}>
              Port: {service.port}
            </Text>
            <Text style={styles.serviceDetails}>
              Type: {service.type}
            </Text>
            <Text style={styles.serviceDetails}>
              Domain: {service.domain}
            </Text>
            {responses[service.name] && (
              <Text style={styles.serviceResponse}>
                Response: {responses[service.name]}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  servicesContainer: {
    flex: 1,
  },
  service: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceDetails: {
    fontSize: 14,
    color: '#666',
  },
  serviceResponse: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 10,
  },
});