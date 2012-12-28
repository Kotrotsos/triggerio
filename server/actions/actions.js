


module.exports = {
    giveDrink: function(data) { 
        console.log("Gave user a " + data.find("drinkType") + " " + data.find("brand"));
    }
};
