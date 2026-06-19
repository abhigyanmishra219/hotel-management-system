"use client"
import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { toast } from "sonner";

export default function Addmember()
{
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [role, setrole] = useState("staff")
    async function handleAdd()
    {
          const Member={
           name,
           email,
           password,
           role
        };
        try{
           const response=await fetch("/api/Add",{
            method:"POST",
            body:JSON.stringify(Member)
          });
          const data=await response.json()
          if(data.success)
          {
            toast("Memeber Added Successfully")
            setname("")
            setemail("")
            setpassword("")
            setrole("staff")
          }
        }
        catch(error:unknown)
        {
            console.log("error in adding member",error)
        }
    }
    return(
        <Dialog.Root>
	<Dialog.Trigger>
		<Button>Add member </Button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		<Dialog.Title>Add Member</Dialog.Title>
		<Dialog.Description size="2" mb="4">
			
		</Dialog.Description>

		<Flex direction="column" gap="3">
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Name
				</Text>
				<TextField.Root
					value={name}
                    onChange={(e)=>setname(e.target.value)}
					placeholder="Enter your full name"
				/>
			</label>
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Email
				</Text>
				<TextField.Root
					value={email}
                    onChange={(e)=>setemail(e.target.value)}
					placeholder="Enter your email"
				/>
			</label>
            <label>
				<Text as="div" size="2" mb="1" weight="bold">
					Password
				</Text>
				<TextField.Root
					value={password}
                    onChange={(e)=>setpassword(e.target.value)}
					placeholder="Enter your password"
				/>
			</label>
            <Select.Root value={role} onValueChange={(value)=>setrole(value)}>
                             <Text as="div" size="2" mb="1" weight="bold">
                                Role
                            </Text>
                <Select.Trigger />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Role</Select.Label>
                        <Select.Item value="receptionist">Receptionist</Select.Item>
                        <Select.Item value="staff">Staff</Select.Item>
                        <Select.Item value="manager">Manager</Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    
                </Select.Content>
            </Select.Root>
            
		</Flex>

		<Flex gap="3" mt="4" justify="end">
			<Dialog.Close>
				<Button variant="soft" color="gray">
					Cancel
				</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button onClick={handleAdd}>Save</Button>
			</Dialog.Close>
		</Flex>
	</Dialog.Content>
</Dialog.Root>

    )
}