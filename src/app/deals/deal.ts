// TODO: Split to multiple files
export interface Period {
    months?: number;
    amount: number;
}

export interface Price {
    periods: Period[];
    firstYear: number;
    totalContractCost: number;
    upFrontCost: number;
    upsell?: any;
    selectedOptions: any[];
}

export interface StandardChannels {
    label: string;
    sortValue: number;
}

export interface TotalChannels {
    label: string;
    sortValue: number;
}

export interface HdChannels {
    label: string;
    sortValue: number;
}

export interface Speed {
    label: string;
    sortValue: number;
}

export interface UploadSpeed {
    label: string;
    sortValue: number;
}

export interface Usage {
    label: string;
    sortValue: number;
}

export interface Minutes {
    label: string;
    sortValue: number;
}

export interface Data {
    label: string;
    sortValue: number;
}

export interface Texts {
    label: string;
    sortValue: number;
}

export interface ConnectionType {
    label: string;
    sortValue: number;
}

export interface Mobile {
    minutes: Minutes;
    data: Data;
    texts: Texts;
    connectionType: ConnectionType;
}

export interface Offer {
    type: string;
    title: string;
    smallLogo: string;
    expiresAt: Date;
}

export interface Provider {
    id: number;
    name: string;
    logo: string;
}

export interface UpfrontCost {
    name: string;
    price: number;
}

export interface PremiumFeatures {
    BTSport?: boolean;
    ComedyCentral?: boolean;
    DiscoveryChannel?: boolean;
    CartoonNetwork?: boolean;
    DisneyChannel?: boolean;
}

export interface PopularChannel {
    name: string;
    channelCategory: string;
    logo: string;
}

export interface Extras {
    sortValue: number;
    labels: string[];
}

export interface Deal {
    title: string;
    prices: Price[];
    id: number;
    contractLength: number;
    tvProduct: string;
    standardChannels: StandardChannels;
    totalChannels: TotalChannels;
    hdChannels: HdChannels;
    speed: Speed;
    uploadSpeed: UploadSpeed;
    usage: Usage;
    mobile: Mobile;
    offer: Offer;
    provider: Provider;
    newLineCost: number;
    upfrontCosts: UpfrontCost[];
    productTypes: string[];
    premiumFeatures: PremiumFeatures;
    popularChannels: PopularChannel[];
    telephoneNumber: string;
    extras: Extras;
    broadbandType: string;
}
