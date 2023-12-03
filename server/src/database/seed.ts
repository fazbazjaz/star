import { getAllRoles, createRole } from "../helpers/roles";
import { getAllTags, createTag } from "../helpers/tags";

const seedRoles = async () => {
  console.log("Seeding: Attempting to Seed Roles to the Database");

  try {
    const existingRolesQuery = await getAllRoles();
    // console.log("Seeding: existingRolesQuery:", existingRolesQuery);

    const roleEntries = ["unverified", "trainee", "volunteer", "admin"];

    if (existingRolesQuery.length === 0) {
      roleEntries.forEach(async (newRoleEntry) => {
        console.log(`Seeding: Adding New Role: ${newRoleEntry}`);
        await createRole(newRoleEntry);
      });
      console.log("Seeding: Completed Seeding Roles to the Database");
      return;
    }

    const existingRoles = existingRolesQuery.map(
      (eachRecord) => eachRecord.role
    );
    // console.log("Seeding: Existing Roles:", existingRoles);

    roleEntries.forEach(async (newRoleEntry) => {
      if (!existingRoles.includes(newRoleEntry)) {
        console.log(`Seeding: Adding New Role: ${newRoleEntry}`);
        await createRole(newRoleEntry);
      }
    });

    console.log("Seeding: Completed Seeding Roles to the Database");
  } catch (error) {
    console.error("Seeding: Error Seeding Roles to the Database", error);
  }
};

const seedTags = async () => {
  console.log("Seeding: Attempting to Seed Tags to the Database");

  try {
    const existingTagsQuery = await getAllTags();
    // console.log("Seeding: existingTagsQuery:", existingTagsQuery);

    const tagEntries = [
      "teamwork",
      "communication",
      "problem solving",
      "leadership",
      "adaptability",
      "time management",
      "conflict resolution",
      "initiative",
      "customer focus",
      "creativity",
      "decision making",
      "stress management",
      "goal setting",
      "project management",
      "prioritization",
      "attention to detail",
      "critical thinking",
      "resilience",
      "interpersonal skills",
      "negotiation",
      "learning agility",
      "innovation",
      "self-motivation",
      "flexibility",
      "analytical skills",
      "delegation",
      "self-awareness",
      "confidentiality",
      "goal achievement",
      "emotional intelligence",
      "motivation",
      "conflict management",
      "team collaboration",
      "presentation skills",
      "persistence",
      "open-mindedness",
      "feedback",
      "result-oriented",
      "problem analysis",
      "inclusivity",
      "integrity",
      "dependability",
      "leadership potential",
      "cultural fit",
      "work ethic",
      "deadlines",
      "strategic thinking",
      "risk management",
      "communication style",
      "assertiveness",
      "resourcefulness",
      "ability to learn from mistakes"
    ];

    if (existingTagsQuery.length === 0) {
      tagEntries.forEach(async (newTagEntry) => {
        console.log(`Seeding: Adding New Tag: ${newTagEntry}`);
        await createTag(newTagEntry);
      });
      console.log("Seeding: Completed Seeding Tags to the Database");
      return;
    }

    const existingTags = existingTagsQuery.map((eachRecord) => eachRecord.tag);
    // console.log("Seeding: Existing Tags:", existingTags);

    tagEntries.forEach(async (newTagEntry) => {
      if (!existingTags.includes(newTagEntry)) {
        console.log(`Seeding: Adding New Tag: ${newTagEntry}`);
        await createRole(newTagEntry);
      }
    });

    console.log("Seeding: Completed Seeding Tags to the Database");
  } catch (error) {
    console.error("Seeding: Error Seeding Tags to the Database", error);
  }
};

const seedAll = async () => {
  try {
    console.log("Seeding: Attempting to Seed the Database");

    await seedRoles();
    await seedTags();

    console.log("Seeding: Completed Seeding the Database");

    process.exit(0);
  } catch (error) {
    console.log("Seeding: Error Seeding the Database");

    process.exit(0);
  }
};

seedAll();
