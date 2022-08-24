import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const EditSubscriptionForm = ({ session, subscription }) => {
  const [amount, setAmount] = useState(subscription.amount);
  const [name, setName] = useState(subscription.name);
  const [description, setDescription] = useState(subscription.subscription);
  const [cycle, setCycle] = useState(subscription.cycle);
  const [duration, setDuration] = useState(subscription.duration);

  const handleUpdateSubscription = async () => {
    const { data, error } = await supabase
      .from("subscriptions")
      .update({
        amount: amount,
        name: name,
        description: description,
        cycle: cycle,
        duration: duration,
        user_id: session.user.id,
      })
      .match({
        id: subscription.id,
      });
  };
  return (
    <Box>
      <form onSubmit={(e) => e.preventDefault()}>
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
          <Input
            type="number"
            value={cycle}
            onChange={(e) => {
              const newCycle = e.target.value;
              setCycle(newCycle);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Duration</FormLabel>
          <Input
            type="number"
            value={duration}
            onChange={(e) => {
              const newDuration = e.target.value;
              setDuration(newDuration);
            }}
          />
        </FormControl>
        <Button type="submit" onClick={handleUpdateSubscription}>
          Update
        </Button>
      </form>
    </Box>
  );
};

export default EditSubscriptionForm;
