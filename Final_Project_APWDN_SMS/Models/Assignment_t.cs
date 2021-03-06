﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Project_APWDN_SMS.Models
{
    public class Assignment_t
    {
        [Key]
        public int assignmentid { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "Title can not be empty")]
        public string assignmenttitle { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "Filename can not be empty")]
        public string filename { get; set; }

        [Column(TypeName = "varchar"), StringLength(100)]
        [Required(ErrorMessage = "directory can not be empty")]
        public string directory { get; set; }

        [Column(TypeName = "datetime")]
        [Required(ErrorMessage = "postdate can not be empty")]
        public System.DateTime postdate { get; set; }

        [Column(TypeName = "datetime")]
        [Required(ErrorMessage = "duedate can not be empty")]
        public System.DateTime duedate { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "sectionid can not be empty")]
        public int sectionid { get; set; }

        [Column(TypeName = "int")]
        [Required(ErrorMessage = "subjectid can not be empty")]
        public int subjectid { get; set; }

        public List<HyperLink> HyperLinks = new List<HyperLink>();

    }
}