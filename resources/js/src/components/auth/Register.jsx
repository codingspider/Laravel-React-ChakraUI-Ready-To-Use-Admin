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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { LOGIN } from "../../routes/commonRoutes";

const Register = () => {

    const { register, handleSubmit } = useForm();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { title: "Business Details", description: "Add your business info" },
    { title: "Settings", description: "Configure settings" },
    { title: "User", description: "Create admin user" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });


  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Step Content UI
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <VStack spacing={4}>
            <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Business Name"
              name="name"
              {...register('name', { required: true })}
            />
            </FormControl>

            <FormControl isRequired>
            <FormLabel>Start Date </FormLabel>
            <Input
              type="date"
              placeholder="Start Date"
              name="start_date"
              {...register('start_date', { required: true })}
            />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Currency</FormLabel>
            <Select placeholder='Select option' {...register('start_date', { required: true })}>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Country</FormLabel>
            <Input
              type="text"
              placeholder="Country"
              name="country"
              {...register('country', { required: true })}
            />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>State </FormLabel>
            <Input
              type="text"
              placeholder="State"
              name="state"
              {...register('state', { required: true })}
            />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>City</FormLabel>
            <Input
              type="text"
              placeholder="City"
              name="city"
              {...register('city', { required: true })}
            />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Zip Code </FormLabel>
            <Input
              type="text"
              placeholder="Zip Code"
              name="zip_code"
              {...register('zip_code', { required: true })}
            />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Address</FormLabel>
            <Input
              type="text"
              placeholder="Address"
              name="landmark"
              {...register('landmark', { required: true })}
            />
            </FormControl>
          </VStack>
        );

      case 1:
        return (
          <VStack spacing={4}>
            <FormControl isRequired>
                <FormLabel>Financial start month</FormLabel>
            <Select placeholder='Select option' {...register('fy_start_month', { required: true })}>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Stock Accounting Method</FormLabel>
            <Select placeholder='Select option' {...register('fy_start_month', { required: true })}>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select>
            </FormControl>

          </VStack>
        );

      case 2:
        return (
          <VStack spacing={4}>
            <FormControl isRequired>
                <FormLabel>First Name </FormLabel>
                <Input
                type="text"
                placeholder="First Name"
                name="first_name"
                {...register('first_name', { required: true })}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Last Name </FormLabel>
                <Input
                type="text"
                placeholder="Last Name"
                name="last_name"
                {...register('last_name', { required: true })}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Username </FormLabel>
                <Input
                type="text"
                placeholder="Username"
                name="username"
                {...register('username', { required: true })}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email </FormLabel>
                <Input
                type="email"
                placeholder="Email"
                name="email"
                {...register('email', { required: true })}
                />
            </FormControl>
            <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                <Input
                    {...register("password", { required: true })}
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl> 
          </VStack>
        );

      default:
        return null;
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('teal.50', 'teal.800')}>
      <Card w="900px" shadow="lg" borderRadius="2xl" m={'5'}>
        <CardHeader>
            <HStack mt={'2'} justifyContent="space-between">
                <Heading fontSize={'sm'}>Register and Get Started in minutes </Heading>
                <ChakraLink  color='teal.500' as={ReactRouterLink} to={LOGIN}>
                    Signin
                </ChakraLink>
            </HStack>
        </CardHeader>
        <CardBody>
          <Flex gap={10}>
            
            {/* Stepper Sidebar */}
            <Stepper
              index={activeStep}
              orientation="vertical"
              height="300px"
              w="250px"
            >
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
                    <StepDescription fontSize="sm">
                      {step.description}
                    </StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>

            {/* Form Area */}
            <Box flex="1">
              <Heading size="md" mb={4}>
                {steps[activeStep].title}
              </Heading>

              <Text mb={6} color="gray.500">
                {steps[activeStep].description}
              </Text>

              {renderStepContent()}

              {/* Buttons */}
              <Flex mt={8} justify="space-between">
                <Button
                  onClick={handlePrev}
                  isDisabled={activeStep === 0}
                  variant="outline"
                >
                  Previous
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button colorScheme="teal" onClick={handleSubmit}>
                    Submit
                  </Button>
                ) : (
                  <Button colorScheme="teal" onClick={handleNext}>
                    Next
                  </Button>
                )}
              </Flex>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Register;