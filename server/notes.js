

/*

Misc. action endpoints. Perform single actions on supplied data.

post: /do/sendmail              .. execute sendmail action, data for action in the request body
post: /do/savedata              .. save data in the database, data in the request body
post: /do/savefile              .. save a file ..
post: /do/alert                 .. broadcast an alert ..

post: /sentiment                .. returns positive, negative or neutral sentiment on the supplied text 

Rules and actions. 

get: /rule                      .. get all rules
get: /rule/47898                .. get rule by id
post: /rule                     .. new rule
put: /rule/47898                .. update rule
delete: /rule/47898             .. delete rule

post: /do/rule/83/11            .. execute a single rule with id 83 on data object with id 11

Abstracted data endpoints. 

get: /data

Dashboard endpoints. 

get: /dashboard                 .. get all dashboards
get: /dashboard/12              .. get dashboard with id 12
post: /dashboard                .. create a new dashboard
put: /dashboard                 .. update the dashboard
delete: /dashboard              .. well...

Widgets are presented on a dashboard. 

get: /widgets                   .. get all widgets
get: /widget/dashboard/12       .. get all widgets from dashboard 12
get: /widget/32                 .. get widget id: 32
post: /widget/14/12             .. put widget 14 onto dashboard 12
put: /widget/14                 .. update widget 14
delete: /widget/14              .. delete widget 14




*/