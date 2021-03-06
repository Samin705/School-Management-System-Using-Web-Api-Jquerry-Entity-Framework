$(document).ready(function(){

    LoadTeacherClasses();
    LoadTeacherSections();
    
    $("#gradeclasstable").change(function(){
        
        LoadTeacherSubjects();
    });

    $("#gradesectiontable").change(function(){
        
        LoadStudents();
    });

    $("#gradestudenttable").change(function(){
        var studentid=$("#gradestudenttable").val();
        
    });

    $("#postgrade").click(function(){
        
        PostGrade();
    });

    function LoadTeacherClasses()
    {
        $.ajax({
                url:"https://localhost:44373/api/teachers/"+localStorage.userid+"/classes",
                method:"get",
                headers:{
                    contentType:"application/json",
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str='<option selected disabled>Select Class</option>';

                        for (var i = 0; i < data.length; i++) {
                            //alert(data[i].classid);
                            
                            str+="<option value="+data[i].classid+">"+data[i].classname+"</option>";
                            $("#gradeclasstable").html(str);
                            
                        };
                    }
                    else if(xmlHttp.status==401)
				{
					$(location).attr('href', "http://127.0.0.1:5500/views/login.html");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
    
        });
    }

    function LoadTeacherSections()
    {
        $.ajax({
                url:"https://localhost:44373/api/teachers/"+localStorage.userid+"/sections",
                method:"get",
                headers:{
                    contentType:"application/json",
                    Authorization: "Basic "+btoa(localStorage.userid+":"+localStorage.userpass)
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str='<option selected disabled>Select Section</option>';

                        for (var i = 0; i < data.length; i++) {
                            //alert(data[i].classid);
                            
                            str+="<option value="+data[i].sectionid+">"+data[i].sectionname+"</option>";
                            $("#gradesectiontable").html(str);
                            
                        };
                    }
                    else if(xmlHttp.status==401)
				{
					$(location).attr('href', "http://127.0.0.1:5500/views/login.html");
					console.log(xmlHttp.status+":"+xmlHttp.statusText);
				}
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
    
        });
    }

    function LoadTeacherSubjects()
    {
        var classid=$("#gradeclasstable").val();
        $.ajax({
                url:"https://localhost:44373/api/teachers/"+classid+"/subjects",
                method:"get",
                headers:{
                    contentType:"application/json"
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str='<option selected disabled>Select Subject</option>';

                        for (var i = 0; i < data.length; i++) {
                            //alert(data[i].classid);
                            
                            str+="<option value="+data[i].subjectid+">"+data[i].subjectname+"</option>";
                            $("#gradesubjecttable").html(str);
                            
                        };
                    }
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
    
        });
    }

    function LoadStudents()
    {
        var classid=$("#gradeclasstable").val();
        var sectionid=$("#gradesectiontable").val();
        $.ajax({
                url:"https://localhost:44373/api/teachers/classes/"+classid+"/sections/"+sectionid+"/students",
                method:"get",
                headers:{
                    contentType:"application/json"
                },
                complete:function(xmlHttp,status){
                    if(xmlHttp.status==200)
                    {
                        var data=xmlHttp.responseJSON;

                        var str='';
                        str='<option selected disabled>Select Student</option>';

                        for (var i = 0; i < data.length; i++) {
                            //alert(data[i].classid);
                            
                            str+="<option value="+data[i].studentid+">"+data[i].studentid+"</option>";
                            $("#gradestudenttable").html(str);
                            
                        };
                    }
                    else
                    {
                        console.log(xmlHttp.status+":"+xmlHttp.statusText);
                    }
                }	
    
        });
    }

    function PostGrade()
{
    var sectionid=$("#gradesectiontable").val();
    var subjectid=$("#gradesubjecttable").val();
    //var studentid=$("#gradestudenttable").val();
	$.ajax({
		url:"https://localhost:44373/api/teachers/sections/"+sectionid+"/subjects/"+subjectid+"/grades",
		method:"post",
		headers:{
			contentType:"application/json"
			
		},
		data:{
			quiz1:$("#quiz1").val(),
			quiz2:$("#quiz2").val(),
            assignment1:$("#assignment1").val(),
            halfyearlymark:$("#halfyearly").val(),
			quiz3:$("#quiz3").val(),
            quiz4:$("#quiz4").val(),
            assignment2:$("#assignment2").val(),
			finalexammark:$("#finalexam").val(),
            finalgrade:$("#finalgrade").val(),
            sectionid:sectionid,
			subjectid:subjectid,
			studentid:$("#gradestudenttable").val(),
		},
		complete:function(xmlHttp,status){
			if(xmlHttp.status==200)
			{
				$("#createmessage").html("Grade Posted!");
				$("#quiz1").val("");
			$("#quiz2").val("");
            $("#assignment1").val("");
            $("#halfyearly").val("");
			$("#quiz3").val("");
         $("#quiz4").val("");
            $("#assignment2").val("");
			$("#finalexam").val("");
         $("#finalgrade").val();
         $("#gradestudenttable").val("");
         LoadTeacherClasses();
         LoadTeacherSections();
					
			}
			
			else
			{
				$("#createmessage").html("Error");
				console.log(xmlHttp.status+":"+xmlHttp.statusText);
			}
		}
	});
}

});