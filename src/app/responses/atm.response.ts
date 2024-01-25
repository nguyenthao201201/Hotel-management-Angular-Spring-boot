// your-types.ts

// Interface cho object trong mảng
export interface ItemType {
    Id: string;
    Code: string;
    BDS_PGD: string;
    BranchType: string;
    LayerType: string;
    Name: string;
    NameEn: string;
    Parent: string;
    Addr: string;
    AddrEn: string;
    Province: {
        _id: string;
        NAME: string;
        Type: string;
        FullName: string;
        AbbrName: string;
    };
    District: {
        _id: string;
        NAME: string;
        Type: string;
        FullName: string;
        AbbrName: string;
    };
    Ward: string;
    Phone: string;
    WorkingTime: string;
    WorkingTimeEn: string;
   
  }
  
  // Interface cho response
  export interface ATMResponse {
    Item: ItemType[];
  }
  