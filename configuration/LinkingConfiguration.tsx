import { LinkingOptions } from "@react-navigation/native";

import { RootStackParamList } from "../components/Types";

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [('/')]
};

export default linking