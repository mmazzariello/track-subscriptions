import React, { useState, useCallback } from "react";
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

const AddSubscriptionForm = ({ session, onRequestHide, onSaveSuccessfull }) => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cycle, setCycle] = useState(0);

  const handleSave = useCallback(async () => {
    const { data, error } = await supabase.from("subscriptions").insert([
      {
        amount: amount,
        name: name,
        description: description,
        cycle: cycle,
        user_id: session.user.id,
      },
    ]);
    if (!error) {
      onRequestHide();
      onSaveSuccessfull();
    }
  }, [amount, name, description, cycle, session.user.id]);

  return (
    <Modal isOpen={true} onClose={onRequestHide}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
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
            No
          </Button>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSubscriptionForm;
