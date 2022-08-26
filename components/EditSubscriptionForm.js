import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Select,
} from "@chakra-ui/react";

const EditSubscriptionForm = ({
  session,
  subscription,
  onRequestHide,
  onSaveSuccessfull,
}) => {
  const [amount, setAmount] = useState(subscription.amount);
  const [name, setName] = useState(subscription.name);
  const [description, setDescription] = useState(subscription.description);
  const [cycle, setCycle] = useState(subscription.cycle);

  const handleUpdateSubscription = async () => {
    const { data, error } = await supabase
      .from("subscriptions")
      .update({
        amount: amount,
        name: name,
        description: description,
        cycle: cycle,
        user_id: session.user.id,
      })
      .match({
        id: subscription.id,
      });
    if (!error) {
      onRequestHide();
      onSaveSuccessfull();
    }
  };

  return (
    <Modal isOpen={true} onClose={onRequestHide}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Subscription</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input
              value={amount}
              type="number"
              onChange={(e) => {
                const newAmount = e.target.value;
                setAmount(newAmount);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => {
                const newName = e.target.value;
                setName(newName);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              value={description}
              onChange={(e) => {
                const newDescription = e.target.value;
                setDescription(newDescription);
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Cycle</FormLabel>
            <Select
              placeholder="Select option"
              onChange={(e) => {
                const newCycle = e.target.value;
                console.log("new", newCycle);
                setCycle(newCycle);
              }}
            >
              <option value="monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onRequestHide}>
            Cancel
          </Button>
          <Button variant="ghost" onClick={handleUpdateSubscription}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditSubscriptionForm;
