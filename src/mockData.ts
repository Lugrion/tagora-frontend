// src/mocks/mockData.ts
import { LabelDTO } from "./types/label";
import { MemoryDTO } from "./types/memory";

export const mockLabels: LabelDTO[] = [
    { id: 1, title: "Work" },
    { id: 2, title: "Personal" },
    { id: 3, title: "Ideas" },
    { id: 4, title: "Travel" },
    { id: 5, title: "Family" },
    { id: 6, title: "Health" },
    { id: 7, title: "Finance" },
    { id: 8, title: "Learning" },
    { id: 9, title: "Goals" },
    { id: 10, title: "Hobbies" },
    { id: 11, title: "Important" },
    { id: 12, title: "Recipes" }
];

export const mockMemories: MemoryDTO[] = [
    {
        id: 1,
        name: "First day at new job",
        url: "https://linkedin.com/in/myprofile",
        labels: [{ id: 1, title: "Work" }, { id: 11, title: "Important" }]
    },
    {
        id: 2,
        name: "Bali vacation ideas",
        url: "https://www.pinterest.com/travel/bali-vacation",
        labels: [{ id: 2, title: "Personal" }, { id: 3, title: "Ideas" }, { id: 4, title: "Travel" }]
    },
    {
        id: 3,
        name: "Mom's birthday present ideas",
        url: null,
        labels: [{ id: 5, title: "Family" }, { id: 3, title: "Ideas" }]
    },
    {
        id: 4,
        name: "Annual physical exam results",
        url: "https://myhealthportal.com/exam-results",
        labels: [{ id: 6, title: "Health" }, { id: 11, title: "Important" }]
    },
    {
        id: 5,
        name: "Investment strategy meeting notes",
        url: "https://docs.google.com/spreadsheets/investment-plan",
        labels: [{ id: 7, title: "Finance" }, { id: 1, title: "Work" }]
    },
    {
        id: 6,
        name: "Spanish learning resources",
        url: "https://duolingo.com/learn/spanish",
        labels: [{ id: 8, title: "Learning" }, { id: 10, title: "Hobbies" }]
    },
    {
        id: 7,
        name: "2023 career goals",
        url: null,
        labels: [{ id: 9, title: "Goals" }, { id: 1, title: "Work" }]
    },
    {
        id: 8,
        name: "Grandma's apple pie recipe",
        url: "https://allrecipes.com/recipe/apple-pie",
        labels: [{ id: 5, title: "Family" }, { id: 12, title: "Recipes" }]
    },
    {
        id: 9,
        name: "Yoga routine for back pain",
        url: "https://youtube.com/yoga-back-pain",
        labels: [{ id: 6, title: "Health" }, { id: 10, title: "Hobbies" }]
    },
    {
        id: 10,
        name: "Project X brainstorming",
        url: null,
        labels: [{ id: 1, title: "Work" }, { id: 3, title: "Ideas" }]
    },
    {
        id: 11,
        name: "Tax deduction documents",
        url: "https://drive.google.com/folder/tax-docs",
        labels: [{ id: 7, title: "Finance" }, { id: 11, title: "Important" }]
    },
    {
        id: 12,
        name: "Books to read this year",
        url: "https://goodreads.com/shelf/to-read",
        labels: [{ id: 8, title: "Learning" }, { id: 9, title: "Goals" }]
    },
    {
        id: 13,
        name: "Weekend hiking trip photos",
        url: "https://photos.google.com/album/hiking-trip",
        labels: [{ id: 2, title: "Personal" }, { id: 4, title: "Travel" }, { id: 10, title: "Hobbies" }]
    },
    {
        id: 14,
        name: "Team building activity ideas",
        url: null,
        labels: [{ id: 1, title: "Work" }, { id: 3, title: "Ideas" }]
    },
    {
        id: 15,
        name: "Kids' vaccination schedule",
        url: "https://myclinic.com/vaccine-schedule",
        labels: [{ id: 5, title: "Family" }, { id: 6, title: "Health" }, { id: 11, title: "Important" }]
    },
    {
        id: 16,
        name: "Budget for home renovation",
        url: "https://excel-budget-template.com/home-renovation",
        labels: [{ id: 7, title: "Finance" }, { id: 9, title: "Goals" }]
    },
    {
        id: 17,
        name: "Online course on React",
        url: "https://udemy.com/course/react-the-complete-guide",
        labels: [{ id: 8, title: "Learning" }, { id: 1, title: "Work" }]
    },
    {
        id: 18,
        name: "Sister's wedding planning",
        url: "https://trello.com/wedding-planning-board",
        labels: [{ id: 5, title: "Family" }, { id: 2, title: "Personal" }]
    },
    {
        id: 19,
        name: "Meditation techniques",
        url: "https://headspace.com/meditation",
        labels: [{ id: 6, title: "Health" }, { id: 10, title: "Hobbies" }]
    },
    {
        id: 20,
        name: "Business expansion ideas",
        url: null,
        labels: [{ id: 1, title: "Work" }, { id: 3, title: "Ideas" }, { id: 9, title: "Goals" }]
    },
    {
        id: 21,
        name: "Emergency fund tracker",
        url: "https://mint.com/budget/emergency-fund",
        labels: [{ id: 7, title: "Finance" }, { id: 11, title: "Important" }]
    },
    {
        id: 22,
        name: "Photography equipment wishlist",
        url: "https://amazon.com/photography-gear",
        labels: [{ id: 10, title: "Hobbies" }, { id: 3, title: "Ideas" }]
    },
    {
        id: 23,
        name: "Client meeting notes - Acme Corp",
        url: null,
        labels: [{ id: 1, title: "Work" }, { id: 11, title: "Important" }]
    },
    {
        id: 24,
        name: "Dad's retirement party ideas",
        url: "https://canva.com/event-invitations",
        labels: [{ id: 5, title: "Family" }, { id: 3, title: "Ideas" }]
    },
    {
        id: 25,
        name: "Meal prep for the week",
        url: "https://mealprepweekly.com/plans",
        labels: [{ id: 6, title: "Health" }, { id: 12, title: "Recipes" }]
    },
    {
        id: 26,
        name: "Credit card payoff plan",
        url: null,
        labels: [{ id: 7, title: "Finance" }, { id: 9, title: "Goals" }]
    },
    {
        id: 27,
        name: "Japanese language resources",
        url: "https://tofugu.com/learn-japanese",
        labels: [{ id: 8, title: "Learning" }, { id: 4, title: "Travel" }]
    },
    {
        id: 28,
        name: "Team performance review notes",
        url: "https://confluence.company.com/team-review",
        labels: [{ id: 1, title: "Work" }, { id: 11, title: "Important" }]
    },
    {
        id: 29,
        name: "Camping gear checklist",
        url: "https://rei.com/checklists/camping",
        labels: [{ id: 2, title: "Personal" }, { id: 4, title: "Travel" }, { id: 10, title: "Hobbies" }]
    },
    {
        id: 30,
        name: "Annual personal review",
        url: "https://notion.so/personal-year-review-template",
        labels: [{ id: 2, title: "Personal" }, { id: 9, title: "Goals" }, { id: 11, title: "Important" }]
    }
];
