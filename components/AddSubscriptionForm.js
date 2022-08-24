import React, { useState, useCallback } from "react";
import { supabase } from "../utils/supabaseClient";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const Subscription = ({ session }) => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cycle, setCycle] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleSave = useCallback(async () => {
    const { data, error } = await supabase.from("subscriptions").insert([
      {
        amount: amount,
        name: name,
        description: description,
        cycle: cycle,
        duration: duration,
        user_id: session.user.id,
      },
    ]);
  }, [amount, name, description, cycle, duration, session.user.id]);

  return (
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
      <Button type="submit" onClick={handleSave}>
        Save
      </Button>
    </form>
  );
};

export default Subscription;
