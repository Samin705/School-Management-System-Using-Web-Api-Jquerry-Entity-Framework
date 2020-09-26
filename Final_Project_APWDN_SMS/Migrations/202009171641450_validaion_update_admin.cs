namespace Final_Project_APWDN_SMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class validaion_update_admin : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Admins", "adminid", c => c.String(nullable: false, maxLength: 50, unicode: false));
            AlterColumn("dbo.Admins", "adminname", c => c.String(nullable: false, maxLength: 50, unicode: false));
            AlterColumn("dbo.Admins", "adminpassword", c => c.String(nullable: false, maxLength: 100, unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Admins", "adminpassword", c => c.String(maxLength: 100, unicode: false));
            AlterColumn("dbo.Admins", "adminname", c => c.String(maxLength: 50, unicode: false));
            AlterColumn("dbo.Admins", "adminid", c => c.String(maxLength: 50, unicode: false));
        }
    }
}
