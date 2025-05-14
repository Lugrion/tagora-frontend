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
        labels: [{ id: 1, title: "Work" }, { id: 11, title: "Important" }]
    },
    {
        id: 2,
        name: "Bali vacation ideas",
        labels: [{ id: 2, title: "Personal" }, { id: 3, title: "Ideas" }, { id: 4, title: "Travel" }]
    },
    {
        id: 3,
        name: "Mom's birthday present ideas",
        labels: [{ id: 5, title: "Family" }, { id: 3, title: "Ideas" }]
    },
    {
        id: 4,
        name: "Annual physical exam results",
        labels: [{ id: 6, title: "Health" }, { id: 11, title: "Important" }]
    },
    {
        id: 5,
        name: "Investment strategy meeting notes",
        labels: [{ id: 7, title: "Finance" }, { id: 1, title: "Work" }]
    },
    {
        id: 6,
        name: "Spanish learning resources",
        labels: [{ id: 8, title: "Learning" }, { id: 10, title: "Hobbies" }]
    },
    {
        id: 7,
        name: "2023 career goals",
        labels: [{ id: 9, title: "Goals" }, { id: 1, title: "Work" }]
    },
    {
        id: 8,
        name: "Grandma's apple pie recipe",
        labels: [{ id: 5, title: "Family" }, { id: 12, title: "Recipes" }]
    },
    {
        id: 9,
        name: "Yoga routine for back pain",
        labels: [{ id: 6, title: "Health" }, { id: 10, title: "Hobbies" }]
    },
    {
        id: 10,
        name: "Project X brainstorming",
        labels: [{ id: 1, title: "Work" }, { id: 3, title: "Ideas" }]
    },
    {
        id: 11,
        name: "Tax deduction documents",
        labels: [{ id: 7, title: "Finance" }, { id: 11, title: "Important" }]
    },
    {
        id: 12,
        name: "Books to read this year",
        labels: [{ id: 8, title: "Learning" }, { id: 9, title: "Goals" }]
    },
    {
        id: 13,
        name: "Weekend hiking trip photos",
        labels: [{ id: 2, title: "Personal" }, { id: 4, title: "Travel" }, { id: 10, title: "Hobbies" }]
    },
    {
        id: 14,
        name: "Team building activity ideas",
        labels: [{ id: 1, title: "Work" }, { id: 3, title: "Ideas" }]
    },
    {
        id: 15,
        name: "Kids' vaccination schedule",
        labels: [{ id: 5, title: "Family" }, { id: 6, title: "Health" }, { id: 11, title: "Important" }]
    },
    {
        id: 16,
        name: "Budget for home renovation",
        labels: [{ id: 7, title: "Finance" }, { id: 9, title: "Goals" }]
    },
    {
        id: 17,
        name: "Online course on React",
        labels: [{ id: 8, title: "Learning" }, { id: 1, title: "Work" }]
    },
    {
        id: 18,
        name: "Sister's wedding planning",
        labels: [{ id: 5, title: "Family" }, { id: 2, title: "Personal" }]
    },
    {
        id: 19,
        name: "Meditation techniques",
        labels: [{ id: 6, title: "Health" }, { id: 10, title: "Hobbies" }]
    },
    {
        id: 20,
        name: "Business expansion ideas",
        labels: [{ id: 1, title: "Work" }, { id: 3, title: "Ideas" }, { id: 9, title: "Goals" }]
    },
    {
        id: 21,
        name: "Emergency fund tracker",
        labels: [{ id: 7, title: "Finance" }, { id: 11, title: "Important" }]
    },
    {
        id: 22,
        name: "Photography equipment wishlist",
        labels: [{ id: 10, title: "Hobbies" }, { id: 3, title: "Ideas" }]
    },
    {
        id: 23,
        name: "Client meeting notes - Acme Corp",
        labels: [{ id: 1, title: "Work" }, { id: 11, title: "Important" }]
    },
    {
        id: 24,
        name: "Dad's retirement party ideas",
        labels: [{ id: 5, title: "Family" }, { id: 3, title: "Ideas" }]
    },
    {
        id: 25,
        name: "Meal prep for the week",
        labels: [{ id: 6, title: "Health" }, { id: 12, title: "Recipes" }]
    },
    {
        id: 26,
        name: "Credit card payoff plan",
        labels: [{ id: 7, title: "Finance" }, { id: 9, title: "Goals" }]
    },
    {
        id: 27,
        name: "Japanese language resources",
        labels: [{ id: 8, title: "Learning" }, { id: 4, title: "Travel" }]
    },
    {
        id: 28,
        name: "Team performance review notes",
        labels: [{ id: 1, title: "Work" }, { id: 11, title: "Important" }]
    },
    {
        id: 29,
        name: "Camping gear checklist",
        labels: [{ id: 2, title: "Personal" }, { id: 4, title: "Travel" }, { id: 10, title: "Hobbies" }]
    },
    {
        id: 30,
        name: "Annual personal review",
        labels: [{ id: 2, title: "Personal" }, { id: 9, title: "Goals" }, { id: 11, title: "Important" }]
    }
];
