<script setup lang="ts">
import { toast } from "vue-sonner";
import { User, Trash } from "lucide-vue-next";

definePageMeta({
    middleware: ["authenticated"],
    title: "Profile",
});

const { user, fetch } = useUserSession();

const username = ref(user.value.name);
watchDebounced(
    username,
    async (newValue) => {
        try {
            await $fetch("/api/user", {
                method: "PATCH",
                body: {
                    name: newValue,
                },
            });
            await fetch();
            toast.success("Username updated");
        } catch (e) {
            toast.error("An error occured during username update");
        }
    },
    { debounce: 1000 },
);

async function deleteAccount() {
    try {
        await $fetch("/api/user", {
            method: "DELETE",
        });
        await fetch();
        toast.info("Your account was successfully deleted");

        await navigateTo("/login");
    } catch (e) {
        toast.error("An error occured during account deletion");
    }
}
</script>

<template>
    <div class="space-y-5 w-full">
        <LayoutPageTitle />
        <Card class="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle class="flex items-center gap-2 text-xl">
                    <User class="text-muted-foreground" /> Account
                </CardTitle>
                <CardDescription> Change the details of your profile here </CardDescription>
            </CardHeader>

            <CardContent>
                <ul class="space-y-4">
                    <li class="flex items-center">
                        <span class="flex-1 font-semibold">Profile picture</span>
                        <Avatar>
                            <AvatarImage :src="user.avatarUrl" :alt="user.name" />
                            <AvatarFallback>{{ user.name.slice(0, 2) }}</AvatarFallback>
                        </Avatar>
                    </li>

                    <Separator />

                    <li class="flex items-center">
                        <span class="flex-1 font-semibold">Username</span>
                        <div class="relative inline-flex items-center">
                            <Input v-model="username" />
                        </div>
                    </li>

                    <Separator />

                    <li class="flex items-center">
                        <span class="flex-1 font-semibold text-destructive-foreground">Danger zone</span>

                        <AlertDialog>
                            <AlertDialogTrigger as-child>
                                <Button variant="destructive"><Trash />Delete your account</Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel class="flex-1">No, keep it</AlertDialogCancel>
                                    <AlertDialogAction @click="deleteAccount" class="flex-1" variant="destructive">
                                        Yes, delete it
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </li>
                </ul>
            </CardContent>
        </Card>
    </div>
</template>
