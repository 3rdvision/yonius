const assert = require("assert");
const yonius = require("../..");

describe("#eq()", function() {
    it("should verify basic equal operations", () => {
        let result;

        result = yonius.eq(2)(2);
        assert.strictEqual(result, true);

        result = yonius.eq(4)(4);
        assert.strictEqual(result, true);

        result = yonius.eq(4)(null);
        assert.strictEqual(result, true);

        assert.throws(
            () => yonius.eq(4)(5),
            err => {
                assert.strictEqual(err instanceof yonius.ValidationError, true);
                assert.strictEqual(err.message, "Must be equal to 4");
                return true;
            }
        );
    });
});

describe("#gt()", function() {
    it("should verify basic greater than operations", () => {
        let result;

        result = yonius.gt(2)(3);
        assert.strictEqual(result, true);

        result = yonius.gt(4)(5);
        assert.strictEqual(result, true);

        result = yonius.gt(4)(null);
        assert.strictEqual(result, true);

        assert.throws(
            () => yonius.gt(4)(4),
            err => {
                assert.strictEqual(err instanceof yonius.ValidationError, true);
                assert.strictEqual(err.message, "Must be greater than 4");
                return true;
            }
        );
    });
});

describe("#notEmpty()", function() {
    it("should verify basic not empty conditions", () => {
        let result;

        result = yonius.notEmpty()("hello");
        assert.strictEqual(result, true);

        result = yonius.notEmpty()("hello world");
        assert.strictEqual(result, true);

        result = yonius.notEmpty()(null);
        assert.strictEqual(result, true);

        assert.throws(
            () => yonius.notEmpty()(""),
            err => {
                assert.strictEqual(err instanceof yonius.ValidationError, true);
                assert.strictEqual(err.message, "Value is empty");
                return true;
            }
        );
    });
});

describe("#isIn()", function() {
    it("should verify basic is in conditions", () => {
        let result;

        result = yonius.isIn(["hello"])("hello");
        assert.strictEqual(result, true);

        result = yonius.isIn(["hello", "world"])("world");
        assert.strictEqual(result, true);

        result = yonius.isIn()(null);
        assert.strictEqual(result, true);

        assert.throws(
            () => yonius.isIn(["hello", "other"])("world"),
            err => {
                assert.strictEqual(err instanceof yonius.ValidationError, true);
                assert.strictEqual(err.message, "Value must be one of: hello, other");
                return true;
            }
        );
    });
});

describe("#isSimple()", function() {
    it("should verify basic is simple conditions", () => {
        let result;

        result = yonius.isSimple()("hello");
        assert.strictEqual(result, true);

        result = yonius.isSimple()("hello.world");
        assert.strictEqual(result, true);

        result = yonius.isSimple()(null);
        assert.strictEqual(result, true);

        assert.throws(
            () => yonius.isSimple()("illegal!"),
            err => {
                assert.strictEqual(err instanceof yonius.ValidationError, true);
                assert.strictEqual(err.message, "Value contains invalid characters");
                return true;
            }
        );
    });
});

describe("#isEmail()", function() {
    it("should verify basic is email conditions", () => {
        let result;

        result = yonius.isEmail()("platforme@platforme.com");
        assert.strictEqual(result, true);

        result = yonius.isEmail()(null);
        assert.strictEqual(result, true);

        assert.throws(
            () => yonius.isEmail()("not_an_email"),
            err => {
                assert.strictEqual(err instanceof yonius.ValidationError, true);
                assert.strictEqual(err.message, "Value is not a valid email");
                return true;
            }
        );
    });
});

describe("#isUrl()", function() {
    it("should verify basic is URL conditions", () => {
        let result;

        result = yonius.isUrl()("https://www.platforme.com/");
        assert.strictEqual(result, true);

        result = yonius.isUrl()("ssh://git@github.com");
        assert.strictEqual(result, true);

        result = yonius.isUrl()(null);
        assert.strictEqual(result, true);

        assert.throws(
            () => yonius.isUrl()("not_a_url"),
            err => {
                assert.strictEqual(err instanceof yonius.ValidationError, true);
                assert.strictEqual(err.message, "Value is not a valid URL");
                return true;
            }
        );
    });
});

describe("#isRegex()", function() {
    it("should verify basic is regex conditions", () => {
        let result;

        result = yonius.isRegex("^a.*$")("abc");
        assert.strictEqual(result, true);

        result = yonius.isRegex("something")(null);
        assert.strictEqual(result, true);

        assert.throws(
            () => yonius.isRegex("^a.*$")("ba"),
            err => {
                assert.strictEqual(err instanceof yonius.ValidationError, true);
                assert.strictEqual(err.message, "Value has incorrect format");
                return true;
            }
        );
    });
});
