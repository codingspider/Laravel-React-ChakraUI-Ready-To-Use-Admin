import React, { useState } from "react";
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
  Button,
  Flex,
  Input,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  useToast,
  Select,
  FormLabel,
  FormControl,
  InputGroup,
  InputRightElement,
  HStack,
  CardHeader,
  useColorModeValue,
  FormErrorMessage,
  FormHelperText,
  SimpleGrid,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { LOGIN } from "../../routes/commonRoutes";
import { ArrowForwardIcon, ArrowBackIcon, CheckIcon } from "@chakra-ui/icons";
import api from "../../axios";
import { STORE_BUSINESS_INFO } from "../../routes/apiRoutes";

const Register = () => {
  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    mode: 'onBlur', // Validate on blur for better feedback
  });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { title: "Business", description: "Basic Info" },
    { title: "Settings", description: "Preferences" },
    { title: "Admin", description: "Create Account" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleNext = async () => {
    // Trigger validation for the current step's fields before proceeding
    const fieldsToValidate = getFieldsForStep(activeStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

const onSubmit = async (data) => {
  setIsSubmitting(true);

  try {
    const response = await api.post(STORE_BUSINESS_INFO, data);

    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

    navigate(LOGIN);

  } catch (error) {
    if (error.response?.status === 422) {
      const errors = error.response.data.errors;

      // Loop through errors
      Object.keys(errors).forEach((field) => {
        toast({
          title: `${field} error`,
          description: errors[field][0],
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
    } else {
      // Other errors
      toast({
        title: "Error",
        description: "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  } finally {
    setIsSubmitting(false);
  }
};

  // Helper to define which fields belong to which step for validation
  const getFieldsForStep = (stepIndex) => {
    switch (stepIndex) {
      case 0: return ["name", "start_date", "currency", "country", "state", "city", "zip_code", "address"];
      case 1: return ["fy_start_month", "accounting_method"];
      case 2: return ["first_name", "last_name", "username", "email", "password"];
      default: return [];
    }
  };

  const renderStepContent = () => {
    const formBg = useColorModeValue('white', 'gray.700');
    const inputBg = useColorModeValue('gray.50', 'gray.600');

    switch (activeStep) {
      case 0:
        return (
          <VStack spacing={5} align="stretch">
            <FormControl isInvalid={errors.name} isRequired>
              <FormLabel>Business Name</FormLabel>
              <Input
                bg={inputBg}
                placeholder="e.g. Acme Corp"
                {...register('name', { required: "Business name is required" })}
              />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              <FormControl isInvalid={errors.start_date} isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  bg={inputBg}
                  {...register('start_date', { required: "Start date is required" })}
                />
                <FormErrorMessage>{errors.start_date && errors.start_date.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.currency} isRequired>
                <FormLabel>Currency</FormLabel>
                <Select bg={inputBg} placeholder='Select currency' {...register('currency', { required: "Currency is required" })}>
                  <option value='1'>USD ($)</option>
                  <option value='2'>EUR (€)</option>
                  <option value='3'>GBP (£)</option>
                  <option value='4'>INR (₹)</option>
                </Select>
                <FormErrorMessage>{errors.currency && errors.currency.message}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <FormControl isInvalid={errors.country} isRequired>
              <FormLabel>Country</FormLabel>
              <Input bg={inputBg} placeholder="Country" {...register('country', { required: "Country is required" })} />
              <FormErrorMessage>{errors.country && errors.country.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.address} isRequired>
              <FormLabel>Address</FormLabel>
              <Input bg={inputBg} placeholder="Street Address" {...register('address', { required: "Address is required" })} />
              <FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
              <FormControl isInvalid={errors.city} isRequired>
                <FormLabel>City</FormLabel>
                <Input bg={inputBg} placeholder="City" {...register('city', { required: "City is required" })} />
                <FormErrorMessage>{errors.city && errors.city.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.state} isRequired>
                <FormLabel>State</FormLabel>
                <Input bg={inputBg} placeholder="State" {...register('state', { required: "State is required" })} />
                <FormErrorMessage>{errors.state && errors.state.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.zip_code} isRequired>
                <FormLabel>Zip Code</FormLabel>
                <Input bg={inputBg} placeholder="Zip" {...register('zip_code', { required: "Zip code is required" })} />
                <FormErrorMessage>{errors.zip_code && errors.zip_code.message}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>
          </VStack>
        );

      case 1:
        return (
          <VStack spacing={6} align="stretch">
            <Text color="gray.500" fontSize="sm">
              Configure your financial settings. You can change these later in the settings panel.
            </Text>

            <FormControl isInvalid={errors.fy_start_month} isRequired>
              <FormLabel>Financial Start Month</FormLabel>
              <Select bg={inputBg} placeholder='Select month' {...register('fy_start_month', { required: "Required" })}>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </Select>
              <FormErrorMessage>{errors.fy_start_month && errors.fy_start_month.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.accounting_method} isRequired>
              <FormLabel>Stock Accounting Method</FormLabel>
              <Select bg={inputBg} placeholder='Select method' {...register('accounting_method', { required: "Required" })}>
                <option value='fifo'>FIFO (First In, First Out)</option>
                <option value='lifo'>LIFO (Last In, First Out)</option>
                <option value='weighted'>Weighted Average</option>
              </Select>
              <FormHelperText>Choose how your inventory cost is calculated.</FormHelperText>
              <FormErrorMessage>{errors.accounting_method && errors.accounting_method.message}</FormErrorMessage>
            </FormControl>
          </VStack>
        );

      case 2:
        return (
          <VStack spacing={5} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              <FormControl isInvalid={errors.first_name} isRequired>
                <FormLabel>First Name</FormLabel>
                <Input bg={inputBg} placeholder="John" {...register('first_name', { required: "Required" })} />
                <FormErrorMessage>{errors.first_name && errors.first_name.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.last_name} isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input bg={inputBg} placeholder="Doe" {...register('last_name', { required: "Required" })} />
                <FormErrorMessage>{errors.last_name && errors.last_name.message}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <FormControl isInvalid={errors.username} isRequired>
              <FormLabel>Username</FormLabel>
              <Input bg={inputBg} placeholder="johndoe123" {...register('username', { required: "Required" })} />
              <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email} isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                bg={inputBg}
                type="email"
                placeholder="john@example.com"
                {...register('email', {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size='md'>
                <Input
                  bg={inputBg}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" }
                  })}
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick} variant="ghost">
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
          </VStack>
        );

      default:
        return null;
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.900')} py={10}>
      <Card
        w="full"
        maxW="800px"
        shadow="2xl"
        borderRadius="xl"
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        mx={4}
      >
        <CardHeader pb={2}>
          <HStack justifyContent="space-between">
            <Heading size="lg" color="teal.600">Get Started</Heading>
            <ChakraLink as={ReactRouterLink} to={LOGIN} fontSize="sm" fontWeight="medium">
              Already have an account? Sign in
            </ChakraLink>
          </HStack>
          <Text color="gray.500" fontSize="sm" mt={1}>Complete the steps to launch your business dashboard.</Text>
        </CardHeader>

        <CardBody>
          {/* Horizontal Stepper */}
          <Stepper size="sm" index={activeStep} mb={8} colorScheme="teal">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>

                {index !== steps.length - 1 && <StepSeparator />}
              </Step>
            ))}
          </Stepper>

          {/* Form Content */}
          <Box minH="300px">
            <Heading size="md" mb={2}>
              {steps[activeStep].title}
            </Heading>
            <Box
              p={6}
              bg={useColorModeValue('gray.50', 'gray.800')}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={useColorModeValue('gray.100', 'gray.700')}
            >
              {renderStepContent()}
            </Box>
          </Box>

          {/* Navigation Buttons */}
          <Flex mt={8} justify="space-between">
            <Button
              onClick={handlePrev}
              isDisabled={activeStep === 0}
              variant="ghost"
              leftIcon={<ArrowBackIcon />}
              colorScheme="gray"
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                colorScheme="teal"
                onClick={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                loadingText="Submitting..."
                rightIcon={<CheckIcon />}
              >
                Complete Registration
              </Button>
            ) : (
              <Button
                colorScheme="teal"
                onClick={handleNext}
                rightIcon={<ArrowForwardIcon />}
              >
                Next Step
              </Button>
            )}
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Register;