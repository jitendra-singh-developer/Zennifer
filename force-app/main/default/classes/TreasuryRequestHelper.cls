global with sharing class TreasuryRequestHelper implements Callable{
    public Object call(String action, Map<String, Object> args) {

       Map<String, Object> input = (Map<String, Object>)args.get('input');
       Map<String, Object> output = (Map<String, Object>)args.get('output');
       Map<String, Object> options = (Map<String, Object>)args.get('options');

       return invokeMethod(action, input, output, options);
   }
   private Object invokeMethod(String methodName, Map<String, Object> input, Map<String, Object> output, Map<String, Object> options) {
   
     //  System.debug('input'+JSON.serializePretty(input));
       if(methodName == 'SaveIRFA'){
           Map<String,Object> treasuryMap = (Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(input.get('ImplementationRequestFinancialAccount')));
          // Map<String,Object> IRFAMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(treasuryMap.get('IRFA')));
           Map<String,Object> FinAccountMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(treasuryMap.get('FinancialAccountBlock')));
         //  Map<String,Object> ACHOriginationMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(IRFAMap.get()));

           
        //    String finAccId = (String)FinAccountMap.get('Financial_Account__c');           
           String treasuryimplementationId = (String)input.get('triID');
        
           Set<String> financialAccountIds = new Set<String>();


           List<FA_Implementation_Linkage__c> irfaList = new List<FA_Implementation_Linkage__c>();
           List<IRFA_Sweep__c> sweepList = new List<IRFA_Sweep__c>();
               
           if(getTypeX(FinAccountMap.get('Financial_Account__c')) == 'String'){
                financialAccountIds.add((String)FinAccountMap.get('Financial_Account__c'));
            }else if(getTypeX(FinAccountMap.get('Financial_Account__c')) == 'Id'){
                financialAccountIds.add((String)FinAccountMap.get('Financial_Account__c'));
            }else if(getTypeX(FinAccountMap.get('Financial_Account__c')) == 'List'){
                List<Object> idList = (List<Object>)JSON.deserializeUntyped(JSON.serialize(FinAccountMap.get('Financial_Account__c')));
                for(Object o: idList){
                    financialAccountIds.add(String.valueOf(o));
                }
            }

            for(String finAccId: financialAccountIds){
                FA_Implementation_Linkage__c fail = new FA_Implementation_Linkage__c();
                fail.Financial_Account__c = finAccId;
                fail.Implementation_Request__c = treasuryimplementationId;
                fail.Services__c = (String)treasuryMap.get('Services__c');
                if((Boolean)treasuryMap.get('ContainsAPIServices') == true){
                    Map<String,Object> APIServicesMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(treasuryMap.get('APIServicesBlock')));
                    fail.Account_Transfer__c = (Boolean)APIServicesMap.get('Account_Transfer__c');
                    fail.ACH_Origination__c = (Boolean)APIServicesMap.get('ACH_Origination__c');
                    fail.Wire_Transfer__c = (Boolean)APIServicesMap.get('Wire_Transfer__c');
                    fail.Previous_Day_Reporting__c = (Boolean)APIServicesMap.get('Previous_Day_Reporting__c');
                    fail.Current_Day_Reporting__c = (Boolean)APIServicesMap.get('Current_Day_Reporting__c');
                    System.debug('Account Transfer '+getTypeX(APIServicesMap.get('Account_Transfer_Limit_Per_Transaction__c')));
                    fail.Account_Transfer_Limit_Per_Transaction__c = ( getTypeX(APIServicesMap.get('Account_Transfer_Limit_Per_Transaction__c')) == 'Decimal') ? (Decimal)APIServicesMap.get('Account_Transfer_Limit_Per_Transaction__c') : Decimal.valueOf((Integer)APIServicesMap.get('Account_Transfer_Limit_Per_Transaction__c'));
                    fail.Account_Transfer_per_day__c = (getTypeX(APIServicesMap.get('Account_Transfer_per_day__c')) == 'Decimal') ? (Decimal)APIServicesMap.get('Account_Transfer_per_day__c') : Decimal.valueOf((Integer)APIServicesMap.get('Account_Transfer_per_day__c'));
                    fail.ACH_Limit_Per_Transaction__c = (getTypeX(APIServicesMap.get('ACH_Limit_Per_Transaction__c')) == 'Decimal') ? (Decimal)APIServicesMap.get('ACH_Limit_Per_Transaction__c') : Decimal.valueOf((Integer)APIServicesMap.get('ACH_Limit_Per_Transaction__c'));
                    fail.ACH_amount_per_day__c = (getTypeX(APIServicesMap.get('ACH_amount_per_day__c')) == 'Decimal' ) ? (Decimal)APIServicesMap.get('ACH_amount_per_day__c') : Decimal.valueOf((Integer)APIServicesMap.get('ACH_amount_per_day__c'));
                    fail.Wire_Limit_Per_Transaction__c = (getTypeX(APIServicesMap.get('Wire_Limit_Per_Transaction__c')) == 'Decimal') ? (Decimal)APIServicesMap.get('Wire_Limit_Per_Transaction__c') : Decimal.valueOf((Integer)APIServicesMap.get('Wire_Limit_Per_Transaction__c'));
                    fail.Wire_per_day__c = (getTypeX(APIServicesMap.get('Wire_per_day__c')) == 'Decimal') ? (Decimal)APIServicesMap.get('Wire_per_day__c') : Decimal.valueOf((Integer)APIServicesMap.get('Wire_per_day__c'));
                    fail.Account_Transfers_per_day__c = (Integer)APIServicesMap.get('Account_Transfers_per_day__c');
                    fail.ACH_Num_per_day__c = (Integer)APIServicesMap.get('ACH_Num_per_day__c');
                    fail.Wire_Num_per_day__c = (Integer)APIServicesMap.get('Wire_Num_per_day__c');
                }
                if((Boolean)treasuryMap.get('ContainsBillPay') == true){
                    Map<String,Object> BillPayMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(treasuryMap.get('BillPayBlock')));
                    fail.Company_Name_Override__c = (String)BillPayMap.get('Company_Name_Override__c');
                    fail.Company_Address_Override__c = (String)BillPayMap.get('Company_Address_Override__c');
                }
                if((Boolean)treasuryMap.get('ContainsACHBlock') == true){
                    Map<String,Object> ACHBlockMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(treasuryMap.get('ACHBlocksBlock')));
                    fail.Block_type__c = (String)ACHBlockMap.get('Block_type__c');
                }
                if((Boolean)treasuryMap.get('ContainsPositivePay') == true){
                    Map<String,Object> PositivePayMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(treasuryMap.get('PositivePayBlock')));
                    fail.Check_Positive_Pay_Type__c = (String)PositivePayMap.get('Check_Positive_Pay_Type__c');
                    fail.Positive_Pay_Type__c = (String)PositivePayMap.get('Positive_Pay_Type__c');
                }
                if((Boolean)treasuryMap.get('ContainsACHOrigination') == true){
                    Map<String,Object> ACHOriginationMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(treasuryMap.get('ACHOriginationBlock')));
                    fail.ACH_Origination_Picklist__c= (String)ACHOriginationMap.get('ACH_Origination_Picklist__c');
                }

                irfaList.add(fail);
            }

            if(!irfaList.isEmpty()){
                insert irfaList;
				
                output.put('irfaId',irfaList[0].Id);
                
                if((Boolean)treasuryMap.get('ContainsSweeps') == true){
                    List<Object> sweepObjectList = new List<Object>();
                    System.debug('Sweep Type '+getTypeX(treasuryMap.get('SweepsBlock')));
                    if(getTypeX(treasuryMap.get('SweepsBlock')) == 'List'){
                        System.debug('  '+(List<Object>)JSON.deserializeUntyped(JSON.serialize(treasuryMap.get('SweepsBlock'))));                        
                        sweepObjectList.addAll((List<Object>)JSON.deserializeUntyped(JSON.serialize(treasuryMap.get('SweepsBlock'))));
                    }else{
                        sweepObjectList.add((Object)treasuryMap.get('SweepsBlock'));
                    }

                    for(FA_Implementation_Linkage__c fail :irfaList){
                        for(Object sweepObj: sweepObjectList){
                            //Sweep Details
                                Map<String,Object> sweepObjMap = (Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(sweepObj));
                                IRFA_Sweep__c sweep = new IRFA_Sweep__c();
                                sweep.Implementation_Request_Financial_Account__c = fail.Id;
                                sweep.Sub_Financial_Account__c = (String)sweepObjMap.get('Sub_Financial_Account__c');
                                System.debug('target balance'+getTypeX(sweepObjMap.get('Target_Balance__c')));
                                sweep.Target_Balance__c = (getTypeX(sweepObjMap.get('Target_Balance__c')) == 'Decimal') ? (Decimal)sweepObjMap.get('Target_Balance__c') : Decimal.valueOf((Integer)sweepObjMap.get('Target_Balance__c'));
                                sweep.Transfer_Priority__c = (String)sweepObjMap.get('Transfer_Priority__c');
                                sweepList.add(sweep);
                        }
                    }
                }

                if(!sweepList.isEmpty()){
                    insert sweepList;
                }
            }          
       }
       
       return true;
   }
   
   public static String getTypeX(Object o) {
       if(o==null)                         return '';              // we can't say much about null
       String                              result  = 'Object';     // if we can't find out anything, we will return 'Object'
       if(o instanceof List<object>)       return 'List';
       if(o instanceof Id)                 return 'Id';
       if(o instanceof Integer)            return 'Integer';
       if(o instanceof Long)               return 'Long';
       if(o instanceof Decimal)            return 'Decimal';
       if(o instanceof Double)             return 'Double';
       try {                                                       
           Name a = (Name) o;                                      // INTENTIONALLY force runtime exception like: "Invalid conversion from runtime type Map<Id,List<Account>> to Name"
       } catch (Exception e) {
           result = e.getMessage().substringAfter('from runtime type ').substringBefore(' ');
           
       }
       return result;
   }
   
}