
// Globals
var HLSystemAPI = {
    equipmentList: "/equipment/list",
    equipmentAdd: "/equipment"
};
// Functions
function initDashboard() {
    console.log("initDashboard");
    equipmentList();
}

// get equipment List

function equipmentList() {
    $.ajax({
        headers:{  
        },   
        url: HLSystemAPI.equipmentList,
        success:function(response){
            var table =  $('#equipment-datatables').DataTable();
            table.clear();
            for (i = 0; i < response.result.length; i ++) {
                var record = response.result[i];
                //console.log(record);
                table.row.add([
                    record.manufacture,
                    record.model,
                    record.description,
                    record.floorLocation,
                    record.serviceHours + " | " + record.serviceCount + " | " + record.serviceRuns,
                    record.lastServiceDate
                ]).draw(false);
            }
        },
        error: function(response) {
            console.log("Error "+response);
        }
    });
}
//
function cancelEquipment() {
    window.location.href = "http://localhost:3001/tables/equipmentList.html";
}
function addEquipment() {
    console.log("addEquipment");
    var manufacture = document.getElementById("manufacture").value;
    var model = document.getElementById("model").value;
    var description = document.getElementById("description").value;
    var floorLocation= document.getElementById("floorLocation").value;
    var contactName = document.getElementById("contactName").value;
    var contactEmail = document.getElementById("contactEmail").value;
    var contactPhone = document.getElementById("contactPhone").value;
    var serviceHours = document.getElementById("serviceHours").value;
    var serviceCount = document.getElementById("serviceCount").value;
    var serviceRuns = document.getElementById("serviceRuns").value;
    var lastServiceDate = document.getElementById("lastServiceDate").value;

    var payload = {
        "manufacture": manufacture,
        "model": model,
        "description" : description,
        "floorLocation" : floorLocation,
        "contactName" : contactName,
        "contactEmail" : contactEmail,
        "contactPhone" : contactPhone,
        "serviceHours" : serviceHours,
        "serviceCount" : serviceCount,
        "serviceRuns": serviceRuns,
        "lastServiceDate": lastServiceDate
    };
    console.log(payload);
    // Post to nodeJS Server
    $.ajax({
        type: "POST",
        headers:{  
            "Content-Type": "application/json"
        },   
        data: JSON.stringify(payload),
        url: HLSystemAPI.equipmentAdd,
        success:function(response){
           // $('#addMemberModal').modal('hide');
           // memberList();
            console.log("added Equipment");
            window.location.href = "http://localhost:3001/tables/equipmentList.html";
        },
        error: function(response) {
            console.log("Error "+response);
        }
    });
}