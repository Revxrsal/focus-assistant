/// Trims the NULL character, so we can use the string for comparisons. 
pub fn trim_null_char(value: &str) -> &str {
    value.trim_end_matches(char::from(0))
}

pub mod pids;