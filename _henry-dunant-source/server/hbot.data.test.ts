import { describe, it, expect } from "vitest";

// We test the data integrity of the HBOT data layer by importing and validating it.
// Since this is a TypeScript module, we validate the shape and completeness of data.

describe("HBOT Data Integrity", () => {
  it("should have exactly 14 FDA-approved indications", async () => {
    const { FDA_INDICATIONS } = await import("../client/src/data/hbot-data");
    expect(FDA_INDICATIONS).toHaveLength(14);
  });

  it("should have exactly 24 references", async () => {
    const { REFERENCES } = await import("../client/src/data/hbot-data");
    expect(REFERENCES).toHaveLength(24);
  });

  it("should have all references with DOI links", async () => {
    const { REFERENCES } = await import("../client/src/data/hbot-data");
    REFERENCES.forEach((ref) => {
      expect(ref.doi).toBeTruthy();
      expect(ref.doi).toMatch(/^https?:\/\//);
    });
  });

  it("should have exactly 4 site stats", async () => {
    const { SITE_STATS } = await import("../client/src/data/hbot-data");
    expect(SITE_STATS).toHaveLength(4);
  });

  it("should have the correct key statistics", async () => {
    const { SITE_STATS } = await import("../client/src/data/hbot-data");
    const values = SITE_STATS.map((s) => s.value);
    expect(values).toContain("14");
    expect(values).toContain("20%+");
    expect(values).toContain("258");
  });

  it("should have exactly 5 mechanisms of action", async () => {
    const { MECHANISMS } = await import("../client/src/data/hbot-data");
    expect(MECHANISMS).toHaveLength(5);
  });

  it("should have 9 departments with HBOT applications", async () => {
    const { DEPARTMENTS_WITH_HBOT } = await import("../client/src/data/hbot-data");
    expect(DEPARTMENTS_WITH_HBOT.length).toBeGreaterThanOrEqual(9);
  });

  it("should have 6 departments without HBOT applications", async () => {
    const { DEPARTMENTS_WITHOUT_HBOT } = await import("../client/src/data/hbot-data");
    expect(DEPARTMENTS_WITHOUT_HBOT).toHaveLength(6);
  });

  it("should have 6 longevity applications", async () => {
    const { LONGEVITY_APPLICATIONS } = await import("../client/src/data/hbot-data");
    expect(LONGEVITY_APPLICATIONS).toHaveLength(6);
  });

  it("should have 4 strategic recommendations", async () => {
    const { STRATEGIC_RECOMMENDATIONS } = await import("../client/src/data/hbot-data");
    expect(STRATEGIC_RECOMMENDATIONS).toHaveLength(4);
  });

  it("all FDA indications should have evidence levels A or B", async () => {
    const { FDA_INDICATIONS } = await import("../client/src/data/hbot-data");
    FDA_INDICATIONS.forEach((ind) => {
      expect(["A", "B"]).toContain(ind.evidenceLevel);
    });
  });

  it("all departments with HBOT should have at least one application", async () => {
    const { DEPARTMENTS_WITH_HBOT } = await import("../client/src/data/hbot-data");
    DEPARTMENTS_WITH_HBOT.forEach((dept) => {
      expect(dept.applications.length).toBeGreaterThan(0);
    });
  });

  it("all references should have sequential numbers from 1 to 24", async () => {
    const { REFERENCES } = await import("../client/src/data/hbot-data");
    const nums = REFERENCES.map((r) => r.num).sort((a, b) => a - b);
    expect(nums[0]).toBe(1);
    expect(nums[nums.length - 1]).toBe(24);
  });
});
