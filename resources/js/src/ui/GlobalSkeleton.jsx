import React from "react";
import { Skeleton, Stack } from "@chakra-ui/react";

const GlobalSkeleton = ({
    lines = 5,
    height = "20px",
    spacing = "3",
    isLoaded = false,
    children
}) => {
    if (isLoaded) return children;

    return (
        <Stack spacing={spacing} w="100%">
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton key={i} height={height} borderRadius="md" />
            ))}
        </Stack>
    );
};

export default GlobalSkeleton;